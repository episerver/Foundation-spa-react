using EPiServer.ServiceLocation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

#nullable enable
namespace HeadlessCms.Infrastructure.NodeJsMiddleware
{
    public class NodeJsProcess : IAsyncDisposable, IDisposable
    {
        public readonly string READY_MARKER = "===READY===";

        private bool _isReady = false;

        protected readonly NodeJsMiddlewareOptions Options;

        protected readonly ILogger<NodeJsProcess> Logger;

        protected Process? JsProcess { get; set; }

        public bool IsReady
        {
            get => _isReady;
            private set
            {
                var hasChanged = _isReady != value;
                _isReady = value;
                if (hasChanged && ReadyStateChanged is not null)
                    ReadyStateChanged.Invoke(this, new EventArgs());
            }
        }

        public event EventHandler? ReadyStateChanged;

        public NodeJsProcess(
            NodeJsMiddlewareOptions options,
            ILogger<NodeJsProcess> logger
        ) {
            Options = options;
            Logger = logger;
            ValidateNodeJsVersion();
            if (!Options.Disabled)
                StartProcess();
        }

        public Task<NodeJsProcess> WhenReady()
        {
            if (IsReady)
                return Task.FromResult(this);
            if (Options.Disabled)
                return Task.FromException<NodeJsProcess>(new ApplicationException("NodeJS is Disabled"));

            var result = new TaskCompletionSource<NodeJsProcess>();

            void handler(object? sender, EventArgs args)
            {
                if (sender is NodeJsProcess proc && proc.IsReady == true)
                {
                    result.SetResult(proc);
                    this.ReadyStateChanged -= handler;
                } else
                {
                    result.SetException(new ApplicationException("Lost process while awaiting start"));
                    this.ReadyStateChanged -= handler;
                }
            }

            this.ReadyStateChanged += handler;
            return result.Task;
        }

        private void StartProcess()
        {
            JsProcess = Process.Start(CreateProcessDescriptor());
            if (JsProcess is null)
                throw new ApplicationException("Unable to start Node.JS Process");
            
            JsProcess.OutputDataReceived += NodeJsProcess_OutputDataReceived;
            JsProcess.ErrorDataReceived += NodeJsProcess_ErrorDataReceived;
            JsProcess.Exited += JsProcess_Exited;
            JsProcess.BeginErrorReadLine();
            JsProcess.BeginOutputReadLine();
        }

        private void JsProcess_Exited(object? sender, EventArgs e)
        {
            IsReady = false;
            if (sender is Process nodeProcess)
            {
                nodeProcess.CancelErrorRead();
                nodeProcess.CancelOutputRead();
                nodeProcess.ErrorDataReceived -= NodeJsProcess_ErrorDataReceived;
                nodeProcess.OutputDataReceived -= NodeJsProcess_OutputDataReceived;
            }
            Logger.LogWarning("Node.JS Process exited");
            if (Options.AutoRestart) {
                Logger.LogInformation("Trying to restart process");
                StartProcess();
            }  else
                Logger.LogCritical("Not restarting Node.JS - disabled frontend");
        }

        private void NodeJsProcess_ErrorDataReceived(object sender, DataReceivedEventArgs e)
        {
            var errorData = e.Data;
            if (errorData is not null)
                Logger.LogError("Node.JS Error Output: { errorData }", errorData);
        }
        private void NodeJsProcess_OutputDataReceived(object sender, DataReceivedEventArgs e)
        {
            var line = e.Data;
            if (string.Equals(line, READY_MARKER))
                IsReady = true;
            if (line is not null)
                Logger.LogTrace("Node.JS Standard Output: { line }", line);
        }

        public readonly IEnumerable<string> ReservedHeaders = new string[] { "host", "content-type", "content-length" };

        public async ValueTask<HttpResponseMessage> ForwardHttpRequest(HttpRequest request)
        {
            if (!IsReady)
                throw new ApplicationException("HTTP Requests can only be forwared when the process is ready");
            if (Options.Disabled)
                throw new ApplicationException("NodeJS is Disabled");

            var handler = new HttpClientHandler()
            {
                AutomaticDecompression = DecompressionMethods.All
            };
            var nodeClient = new HttpClient();
            var requestPath = CreateLocalUrl(request);
            var nodeRequest = new HttpRequestMessage(new HttpMethod(request.Method), requestPath);
            foreach (var header in request.Headers.Where(hv => !ReservedHeaders.Contains(hv.Key.ToLower()) && hv.Key[..1] != ":"))
                nodeRequest.Headers.Add(header.Key, (IEnumerable<string>)header.Value);
            if (request.ContentLength > 0)
            {
                nodeRequest.Content = new StreamContent(request.BodyReader.AsStream(true));
                nodeRequest.Content.Headers.ContentType = MediaTypeHeaderValue.Parse(request.Headers.ContentType);
                nodeRequest.Content.Headers.ContentLength = request.ContentLength;
            }
            return await nodeClient.SendAsync(nodeRequest);
        }
        public async ValueTask DisposeAsync()
        {
            if (JsProcess is not null)
            {
                JsProcess.Kill();
                await JsProcess.WaitForExitAsync();
                JsProcess.CancelErrorRead();
                JsProcess.CancelOutputRead();
                JsProcess.OutputDataReceived -= NodeJsProcess_OutputDataReceived;
                JsProcess.ErrorDataReceived -= NodeJsProcess_ErrorDataReceived;
                JsProcess.Dispose();
            }
            GC.SuppressFinalize(this);
        }
        public void Dispose()
        {
            if (JsProcess is not null)
            {
                JsProcess.Kill();
                JsProcess.WaitForExit();
                JsProcess.CancelErrorRead();
                JsProcess.CancelOutputRead();
                JsProcess.OutputDataReceived -= NodeJsProcess_OutputDataReceived;
                JsProcess.ErrorDataReceived -= NodeJsProcess_ErrorDataReceived;
                JsProcess.Dispose();
            }
            GC.SuppressFinalize(this);
        }
        protected string CreateLocalUrl(HttpRequest request)
        {
            var protocol = Options.UseHttps ? "https:" : "http:";
            var requestPath = $"{ protocol }//{ Options.Host }:{ Options.Port }{ request.Path }{ request.QueryString }";
            return requestPath;
        }
        protected ProcessStartInfo CreateProcessDescriptor() => new()
        {
            UseShellExecute = false,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            RedirectStandardInput = true,
            FileName = "node",
            Arguments = Options.FrontendPath + Options.ScriptName,
            WorkingDirectory = Options.FrontendPath
        };

        protected void ValidateNodeJsVersion()
        {
            var process = Process.Start(new ProcessStartInfo()
            {
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                RedirectStandardInput = true,
                FileName = "node",
                Arguments = "--version"
            });
            if (process is null)
                throw new ApplicationException("Unable to start the Node.JS Process");
            process.WaitForExit();
            if (process.ExitCode != 0)
                throw new ApplicationException("Node.JS was unable to report a version");
            var nodeVersionString = process.StandardOutput.ReadToEnd().TrimEnd().TrimStart('v');
            if (!(Version.TryParse(nodeVersionString, out Version? nodeVersion) && nodeVersion.Major >= 16))
                throw new ApplicationException($"Detected Node.JS { nodeVersionString }, Node.JS 16 or up is required");
            Logger.LogInformation("Running node: { nodeVersionString }", nodeVersionString);
        }
    }
}
#nullable restore
