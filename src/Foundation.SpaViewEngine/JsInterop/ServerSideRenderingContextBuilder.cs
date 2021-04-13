using EPiServer.ContentApi.Core.Serialization;
using EPiServer.Framework.Cache;
using EPiServer.ServiceLocation;
using Foundation.SpaViewEngine.Infrastructure;
using Foundation.SpaViewEngine.JsInterop.Models;
using Foundation.SpaViewEngine.Models;
using System.Web.Mvc;

namespace Foundation.SpaViewEngine.JsInterop
{
    [ServiceConfiguration(typeof(ServerSideRenderingContextBuilder), Lifecycle = ServiceInstanceScope.Singleton)]
    public class ServerSideRenderingContextBuilder
    {
        protected virtual IContentModelMapper ContentModelMapper { get; }
        protected virtual ResultModelResolver ResultModelResolver { get; }
        protected virtual SpaViewCache Cache { get; }

        public ServerSideRenderingContextBuilder(
            IContentModelMapper contentModelMapper,
            ResultModelResolver resultModelResolver,
            SpaViewCache spaViewCache
        )
        {
            ContentModelMapper = contentModelMapper;
            Cache = spaViewCache;
            ResultModelResolver = resultModelResolver;
        }

        /// <summary>
        /// Perform the actual construction of the server side rendering context
        /// </summary>
        /// <param name="context">The view for which the context must be constructed</param>
        /// <returns>The context for the JavaScript engine to execute against</returns>
        public virtual ServerSideRenderingContext Build(ViewContext context)
        {
            var iContent = context.GetRoutedContent();
            var action = string.Empty;
            if (context.RouteData.Values.TryGetValue("action", out object actionData)) action = actionData.ToString();
            var cacheKey = Cache.CreateCacheKey(action, CacheType.Context, iContent);
            if (Cache.TryGet<ServerSideRenderingContext>(cacheKey, ReadStrategy.Immediate, out var ssrContext))
                return ssrContext;

            ssrContext = ServiceLocator.Current.GetInstance<ServerSideRenderingContext>();
            ssrContext.IContent = ContentModelMapper.TransformContent(iContent, true, "*");
            ssrContext.ContentLink = ssrContext.IContent.ContentLink;
            ssrContext.ContextInfo = context.Controller.GetType().FullName;
            ssrContext.Action = action;
            ssrContext.ActionResponse = context.ViewData.Model;
            
            Cache.Insert(cacheKey, ssrContext, iContent);

            return ssrContext;
        }
    }
}
