using EPiServer.ContentApi.Core.Internal;
using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Internal;
using EPiServer.ServiceLocation;
using System.Globalization;

namespace Foundation.ContentApi.Extensions.Conversion.StructuredHtml
{
    [ServiceConfiguration(Lifecycle = ServiceInstanceScope.Transient, IncludeServiceAccessor = true)]
    public class StructuredHtmlContext
    {
        private Injected<IContentModelReferenceConverter> _contentModelReferenceConverter;
        private Injected<UrlResolverService> _urlResolverService;
        public IContentModelReferenceConverter ContentModelReferenceConverter => _contentModelReferenceConverter.Service;
        public UrlResolverService UrlResolverService => _urlResolverService.Service;

        public CultureInfo Language { get; set; } = CultureInfo.InvariantCulture;
        public bool IsManagementRequest { get; set; } = false;

        public string LanguageName => Language.Name;

        public static StructuredHtmlContext FromConverterContext(ConverterContext converterContext) => new ()
        {
            Language = converterContext.Language,
            IsManagementRequest = converterContext.IsContentManagementRequest
        };

    }
}
