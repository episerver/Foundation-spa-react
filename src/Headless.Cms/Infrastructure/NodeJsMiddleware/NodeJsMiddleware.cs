using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
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

        public NodeJsMiddleware(
            RequestDelegate next,
            ILogger<NodeJsMiddleware> logger,
            NodeJsProcess process,
            NodeJsMiddlewareOptions options,
            NodeJsForwarder forwarder
        )
        {
            _next = next;
            _logger = logger;
            _options = options;
            _process = process;
            _forwarder = forwarder;
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

        protected bool ShouldHandleRequest(HttpRequest req)
        {
            if (req.Path.StartsWithSegments("/globalassets"))
                return false;
            return true;
        }
    }
}
