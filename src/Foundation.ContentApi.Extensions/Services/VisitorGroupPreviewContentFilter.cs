using EPiServer.ContentApi.Core.Serialization;
using EPiServer.Personalization.VisitorGroups;
using EPiServer.Security;
using EPiServer.Web;
using Microsoft.AspNetCore.Http;

namespace Foundation.ContentApi.Extensions.Services
{
    public class VisitorGroupPreviewContentFilter : IContentFilter
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IContextModeResolver _contextModeResolver;

        public VisitorGroupPreviewContentFilter(IHttpContextAccessor httpContextAccessor, IContextModeResolver contextModeResolver)
        {
            _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
            _contextModeResolver = contextModeResolver ?? throw new ArgumentNullException(nameof(contextModeResolver));
        }

        public Type HandledContentModel => typeof(IContent);

        public void Filter(IContent content, ConverterContext converterContext)
        {
            if (!_contextModeResolver.CurrentMode.EditOrPreview()) return;

            var visitorGroupId = _httpContextAccessor.HttpContext?.Request.Query[VisitorGroupRole.VisitorGroupKeyByID];

            if (!string.IsNullOrEmpty(visitorGroupId))
            {
                // setup impersonate visitor group
                _httpContextAccessor.HttpContext?.SetupVisitorGroupImpersonation(content, AccessLevel.Read);
            }
        }
    }
}
