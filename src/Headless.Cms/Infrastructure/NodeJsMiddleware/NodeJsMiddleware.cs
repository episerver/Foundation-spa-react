using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace HeadlessCms.Infrastructure.NodeJsMiddleware
{
    public class NodeJsMiddleware : IAsyncDisposable
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<NodeJsMiddleware> _logger;
        private readonly NodeJsProcess _process;
        private readonly NodeJsMiddlewareOptions _options;

        public NodeJsMiddleware(
            RequestDelegate next,
            ILogger<NodeJsMiddleware> logger,
            NodeJsProcess process,
            NodeJsMiddlewareOptions options
        )
        {
            _next = next;
            _logger = logger;
            _options = options;
            _process = process;
        }

        public async ValueTask DisposeAsync()
        {
            GC.SuppressFinalize(this);
            await _process.DisposeAsync();
        }

        public readonly IEnumerable<string> ReservedResponseHeaders = new String[] { "Connection", "Transfer-Encoding", "Keep-Alive", "Upgrade", "Proxy-Connection" };

        public async Task InvokeAsync(HttpContext context)
        {
            if (_options.Disabled)
            {
                await _next(context);
                return;
            }

            var proc = await _process.WhenReady();
            if (proc is not null) {
                var response = await proc.ForwardHttpRequest(context.Request);
                if (response is not null)
                {
                    if (response.IsSuccessStatusCode)
                    {
                        context.Response.StatusCode = (int)response.StatusCode;
                        foreach (var header in response.Headers.Where(hp => !ReservedResponseHeaders.Contains(hp.Key)))
                        {
                            context.Response.Headers.Add(new KeyValuePair<string, StringValues>(header.Key, header.Value.ToArray()));
                        }
                        await response.Content.CopyToAsync(context.Response.Body);
                        //await new GZipStream(response.Content.ReadAsStream(), CompressionMode.Decompress, true).CopyToAsync(context.Response.Body);
                        return;
                    }
                    if (response.StatusCode == HttpStatusCode.NotModified)
                    {
                        context.Response.StatusCode = StatusCodes.Status304NotModified;
                        foreach (var header in response.Headers.Where(hp => !ReservedResponseHeaders.Contains(hp.Key)))
                        {
                            context.Response.Headers.Add(new KeyValuePair<string, StringValues>(header.Key, header.Value.ToArray()));
                        }
                        return;
                    }
                }
                
            }
            await _next(context);
        }
    }
}
