using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

#nullable enable
namespace HeadlessCms.Infrastructure.NodeJsMiddleware
{
    /// <summary>
    /// Basic sub-process governor to start the Node.JS frontend and 
    /// keep it running during the lifecycle of the .Net backend instance
    /// </summary>
    public class NodeJsProcess : IAsyncDisposable, IDisposable
    {
        public const string ClientName = "NodeJsProcessClient";

        public readonly string READY_MARKER = "===READY===";

        private bool _mayRestart = true;

        private bool _processResponding = false;

        protected readonly NodeJsMiddlewareOptions Options;

        protected readonly ILogger<NodeJsProcess> Logger;

        protected readonly IHttpClientFactory ClientFactory;

        protected readonly IWebHostEnvironment Environment;

        protected Process? JsProcess { get; set; }

        public bool IsReady
        {
            get
            {
                if (Options.AutoStart && (JsProcess is null || JsProcess.HasExited))
                    return false;
                return _processResponding;
            }
        }

        public NodeJsProcess(
            NodeJsMiddlewareOptions options,
            ILogger<NodeJsProcess> logger,
            IHttpClientFactory httpClientFactory,
            IWebHostEnvironment environment
        ) {
            Options = options;
            Logger = logger;
            ClientFactory = httpClientFactory;
            Environment = environment;
            
            if (!Options.Disabled)
            {
                ValidateNodeJsVersion();
                StartProcess();
            }
        }

        public async Task<NodeJsProcess> WhenReady(CancellationToken cancellationToken = default)
        {
            if (IsReady)
                return this;
            if (Options.Disabled)
                throw new ApplicationException("Node.JS Middleware has been disabled");

            var sw = Stopwatch.StartNew();
            var timeout = TimeSpan.FromMinutes(Options.StartupTimeout);

            while (!IsReady && sw.Elapsed < timeout)
            {
                if (cancellationToken.IsCancellationRequested)
                {
                    break;
                }

                _processResponding = await ProcessIsResponding(cancellationToken);

                if (_processResponding)
                {
                    return this;
                }

                await Task.Delay(5000, cancellationToken);
            }

            if (cancellationToken.IsCancellationRequested)
                return this;

            throw new ApplicationException("The Node.JS application failed to respond within the given startup time");
        }

        protected virtual void StartProcess()
        {
            if (!Options.AutoStart)
            {
                Logger.LogWarning("Node.JS Process start requested, but disabled by configuration");
                return;
            }
            JsProcess = Process.Start(CreateProcessDescriptor());
            if (JsProcess is null)
                throw new ApplicationException("Unable to start Node.JS Process");
            
            JsProcess.OutputDataReceived += NodeJsProcess_OutputDataReceived;
            JsProcess.ErrorDataReceived += NodeJsProcess_ErrorDataReceived;
            JsProcess.Exited += JsProcess_Exited;
            JsProcess.BeginErrorReadLine();
            JsProcess.BeginOutputReadLine();
        }

        protected void JsProcess_Exited(object? sender, EventArgs e)
        {
            if (sender is Process nodeProcess)
            {
                nodeProcess.CancelErrorRead();
                nodeProcess.CancelOutputRead();
                nodeProcess.ErrorDataReceived -= NodeJsProcess_ErrorDataReceived;
                nodeProcess.OutputDataReceived -= NodeJsProcess_OutputDataReceived;
            }
            Logger.LogWarning("Node.JS Process exited");
            if (_mayRestart && Options.AutoRestart) {
                Logger.LogInformation("Trying to restart process");
                StartProcess();
            }  else
                Logger.LogCritical("Not restarting Node.JS - disabled frontend");
        }

        protected void NodeJsProcess_ErrorDataReceived(object sender, DataReceivedEventArgs e) => Logger.LogError(e.Data);
        protected void NodeJsProcess_OutputDataReceived(object sender, DataReceivedEventArgs e) => Logger.LogInformation(e.Data);

        public async ValueTask DisposeAsync()
        {
            _mayRestart = false;
            if (JsProcess is not null)
            {
                JsProcess.Exited -= JsProcess_Exited;
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
            _mayRestart = false;
            if (JsProcess is not null)
            {
                JsProcess.Exited -= JsProcess_Exited;
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

        protected virtual ProcessStartInfo CreateProcessDescriptor()
        {
            var frontedPath = Path.GetFullPath(Path.Join(Environment.ContentRootPath, Options.FrontendPath));
            if (!Directory.Exists(frontedPath))
                throw new ApplicationException("The configured frontend path cannot be found on disk (relative to the content root path)");

            IList<string> arguments = new List<string>();

            // Add support for Yarn PNP
            var pnpContextFile = Path.GetFullPath(Path.Join(frontedPath, ".pnp.cjs"));
            if (File.Exists(pnpContextFile))
                arguments.Add($"--require={pnpContextFile}");
            var pnpLoaderFile = Path.GetFullPath(Path.Join(frontedPath, ".pnp.loader.mjs"));
            if (File.Exists(pnpContextFile))
                arguments.Add($"--loader=file:///{pnpLoaderFile}");

            arguments.Add(Path.Join(frontedPath, Options.ScriptName));
            arguments.Add(Options.Port.ToString());

            var args = String.Join(" ", arguments);
            return new()
            {
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                RedirectStandardInput = true,
                FileName = "node",
                Arguments = args,
                WorkingDirectory = frontedPath
            };
        }

        protected virtual async Task<bool> ProcessIsResponding(CancellationToken cancellationToken, int requestTimeOut = 5)
        {
            using var timeout = new CancellationTokenSource(TimeSpan.FromSeconds(requestTimeOut));
            using var cancellationTokenSource = CancellationTokenSource.CreateLinkedTokenSource(timeout.Token, cancellationToken);

            try
            {
                var client = ClientFactory.CreateClient(ClientName);
                var response = await client.GetAsync(Options.DestinationServer, cancellationTokenSource.Token);
                var responding = response.IsSuccessStatusCode;

                return responding;
            }
            catch (Exception exception) when (
                exception is HttpRequestException ||
                exception is TaskCanceledException ||
                exception is OperationCanceledException)
            {
                Logger.LogDebug(exception, "Failed to connect to the process.");

                return false;
            }
        }

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
