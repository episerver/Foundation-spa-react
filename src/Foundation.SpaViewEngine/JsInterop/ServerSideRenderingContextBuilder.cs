using EPiServer;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.ServiceLocation;
using EPiServer.Web.Routing;
using Foundation.ContentDeliveryApi.Models;
using Foundation.SpaViewEngine.JsInterop.Models;
using System.Linq;
using System.Web.Mvc;

namespace Foundation.SpaViewEngine.JsInterop
{
    [ServiceConfiguration(typeof(ServerSideRenderingContextBuilder), Lifecycle = ServiceInstanceScope.Singleton)]
    public class ServerSideRenderingContextBuilder
    {
        protected virtual IViewModelSerializer ViewModelSerializer { get; }

        protected virtual IUrlResolver UrlResolver { get; }

        protected virtual ILanguageBranchRepository LanguageBranchRepository { get; }

        protected virtual IContentLoader ContentLoader { get; }

        public ServerSideRenderingContextBuilder(
            IViewModelSerializer viewModelSerializer,
            IUrlResolver urlResolver,
            ILanguageBranchRepository languageBranchRepository,
            IContentLoader contentLoader
        )
        {
            ViewModelSerializer = viewModelSerializer;
            UrlResolver = urlResolver;
            LanguageBranchRepository = languageBranchRepository;
            ContentLoader = contentLoader;
        }

        /// <summary>
        /// Helper method that enables plugging a completely different JSON
        /// serialization engine when the ViewModelSerializer isn't the desired
        /// JSON serialization engine.
        /// </summary>
        /// <param name="data">The data to be serialized</param>
        /// <returns>JSON Representation of provided data</returns>
        public virtual string AsJson(object data) => ViewModelSerializer.ConvertToJson(data);

        /// <summary>
        /// Perform the actual construction of the server side rendering context
        /// </summary>
        /// <param name="context">The view for which the context must be constructed</param>
        /// <returns>The context for the JavaScript engine to execute against</returns>
        public virtual ServerSideRenderingContext Build(ViewContext context)
        {
            var iContent = GetCurrentContent(context);
            var ssrContext = ServiceLocator.Current.GetInstance<ServerSideRenderingContext>();
            ssrContext.IContent = AsJson(iContent);
            ssrContext.ContentLink = AsJson(BuildContentLink(iContent));
            ssrContext.ContextInfo = context.Controller.GetType().FullName;
            return ssrContext;
        }

        protected virtual IContent GetCurrentContent(ViewContext context) => context.RequestContext.RouteData.DataTokens.FirstOrDefault(x => x.Key.Equals("routedData")).Value as IContent;

        protected virtual ContentLink BuildContentLink(IContent content)
        {
            if (content == null) { return new ContentLink(); }
            return new ContentLink()
            {
                id = content.ContentLink.ID,
                guidValue = content?.ContentGuid,
                providerName = content.ContentLink.ProviderName,
                workId = content.ContentLink.WorkID,
                url = UrlResolver.GetUrl(content.ContentLink)
            };
        }
    }
}
