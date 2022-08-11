using System;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using Yarp.ReverseProxy.Forwarder;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace HeadlessCms.Infrastructure.NodeJsMiddleware
{
    /// <summary>
    /// This is the main reverse proxy class for the Node.JS middleware
    /// logic. It acts as a simple wrapper around the IHttpForwarder from
    /// Yarp.ReverseProxy.
    /// </summary>
    public class NodeJsForwarder
    {
        protected readonly IHttpForwarder Forwarder;

        protected readonly NodeJsMiddlewareOptions Options;

        private readonly HttpMessageInvoker HttpClient;

        private readonly HttpTransformer Transformer;

        private readonly ForwarderRequestConfig RequestConfig;

        protected virtual string TargetPrefix
        {
            get
            {
                var protocol = Options.UseHttps ? "https:" : "http:";
                return $"{ protocol }//{ Options.Host }:{ Options.Port }/";
            }
        }

        public NodeJsForwarder(
            IHttpForwarder forwarder,
            NodeJsMiddlewareOptions options
        ) {
            Forwarder = forwarder;
            Options = options;
            HttpClient = new HttpMessageInvoker(new SocketsHttpHandler()
            {
                UseProxy = false,
                AllowAutoRedirect = false,
                AutomaticDecompression = DecompressionMethods.None,
                UseCookies = false,
                ActivityHeadersPropagator = new ReverseProxyPropagator(DistributedContextPropagator.Current)
            });
            Transformer = HttpTransformer.Default;
            RequestConfig = new ForwarderRequestConfig { ActivityTimeout = TimeSpan.FromSeconds(Options.ProxyTimeout) };
        }

        public virtual ValueTask<ForwarderError> ProxyRequest(HttpContext context) 
            => Forwarder.SendAsync(context, TargetPrefix, HttpClient, RequestConfig, Transformer);
    }
}
