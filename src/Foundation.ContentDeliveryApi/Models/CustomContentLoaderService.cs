using EPiServer;
using EPiServer.ContentApi.Core;
using EPiServer.Core;
using EPiServer.Editor;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using EPiServer.Web.Routing;
using System.Web;

namespace Foundation.ContentDeliveryApi.Models
{
    public class CustomContentLoaderService : ContentLoaderService
    {
        private readonly ServiceAccessor<HttpContextBase> _httpContextAccessor;

        public CustomContentLoaderService(IContentLoader contentLoader,
            IPermanentLinkMapper permanentLinkMapper,
            IUrlResolver urlResolver,
            EPiServer.ContentApi.Core.IContextModeResolver contextModeResolver,
            IContentProviderManager providerManager,
            ServiceAccessor<HttpContextBase> httpContextAccessor) : base(contentLoader, permanentLinkMapper, urlResolver, contextModeResolver, providerManager)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        protected override bool ShouldContentBeExposed(IContent content)
        {
            //In EditMode, unpublished or expired content is still returned
            if (GetContextMode() == ContextMode.Edit)
            {
                return true;
            }
            return base.ShouldContentBeExposed(content);
        }

        private ContextMode GetContextMode()
        {
            var httpCtx = _httpContextAccessor();
            if (httpCtx == null || httpCtx.Request == null || httpCtx.Request.QueryString[PageEditing.EpiEditMode] == null)
            {
                return ContextMode.Default;
            }
            if (bool.TryParse(httpCtx.Request.QueryString[PageEditing.EpiEditMode], out bool editMode))
            {
                return editMode ? ContextMode.Edit : ContextMode.Preview;
            }
            return ContextMode.Undefined;
        }
    }
}
