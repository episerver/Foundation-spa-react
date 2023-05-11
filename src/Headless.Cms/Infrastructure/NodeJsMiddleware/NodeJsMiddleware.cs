using EPiServer.Shell.Modules;
using EPiServer.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Yarp.ReverseProxy.Forwarder;

namespace HeadlessCms.Infrastructure.NodeJsMiddleware
{
    public class NodeJsMiddleware : IAsyncDisposable
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<NodeJsMiddleware> _logger;
        private readonly NodeJsProcess _process;
        private readonly NodeJsMiddlewareOptions _options;
        private readonly NodeJsForwarder _forwarder;
        private readonly IEnumerable<string> _SystemRootPaths;

        public NodeJsMiddleware(
            RequestDelegate next,
            ILogger<NodeJsMiddleware> logger,
            NodeJsProcess process,
            NodeJsMiddlewareOptions options,
            NodeJsForwarder forwarder,
            ProtectedModuleOptions protectedModuleOptions
        )
        {
            _next = next;
            _logger = logger;
            _options = options;
            _process = process;
            _forwarder = forwarder;
            _SystemRootPaths = new string[] {
                VirtualPathResolver.Instance.ToAbsolute(protectedModuleOptions.RootPath).TrimEnd('/'),
                VirtualPathResolver.Instance.ToAbsolute("~/GlobalAssets/").TrimEnd('/')
            };
            _logger.LogInformation("Node.JS Middleware instantiated");
        }



        public async ValueTask DisposeAsync()
        {
            GC.SuppressFinalize(this);
            await _process.DisposeAsync();
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (_options.Disabled || !ShouldHandleRequest(context.Request))
            {
                await _next(context);
                return;
            }

            var proc = await _process.WhenReady();
            if (proc is not null) {
                var result = await _forwarder.ProxyRequest(context);
                if (result == ForwarderError.None) {
                    return; // This is final middleware, so we won't continue if we have a result
                }
            }
            await _next(context);
        }

        protected bool ShouldHandleRequest(HttpRequest req) => 
            !_SystemRootPaths
                .Any(x => req.Path.StartsWithSegments(x, StringComparison.OrdinalIgnoreCase));
    }
}
