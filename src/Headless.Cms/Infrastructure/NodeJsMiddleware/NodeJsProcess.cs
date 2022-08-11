using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;
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
        public readonly string READY_MARKER = "===READY===";

        private bool _isReady = false;

        private bool _mayRestart = true;

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
            ILogger<NodeJsProcess> logger,
            IHostApplicationLifetime lifecycle
        ) {
            Options = options;
            Logger = logger;
            
            if (!Options.Disabled)
            {
                ValidateNodeJsVersion();
                StartProcess();
            }
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
            if (_mayRestart && Options.AutoRestart) {
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
                Logger.LogInformation("Node.JS Standard Output: { line }", line);
        }

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

        protected ProcessStartInfo CreateProcessDescriptor() => new()
        {
            UseShellExecute = false,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            RedirectStandardInput = true,
            FileName = "node",
            Arguments = $"{ Options.FrontendPath}{ Options.ScriptName} { Options.Port }",
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
