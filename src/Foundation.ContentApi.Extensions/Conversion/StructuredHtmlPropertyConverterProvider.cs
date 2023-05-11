using EPiServer.ContentApi.Core.Serialization;
using EPiServer.Core;
using EPiServer.Framework.Web;
using EPiServer.ServiceLocation;
using EPiServer.SpecializedProperties;
using EPiServer.Web;
using Foundation.ContentApi.Extensions.Conversion.StructuredHtml;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Foundation.ContentApi.Extensions.Conversion
{
    public class StructuredHtmlPropertyConverterProvider : IPropertyConverterProvider, IDisposable, IAsyncDisposable
    {
        public int SortOrder => 200;
        private readonly IServiceProvider _serviceProvider;
        private readonly StructuredHtmlPropertyOptions _options;
        private readonly ITemplateResolverEvents _resolverEvents;

        public StructuredHtmlPropertyConverterProvider(
            IServiceProvider serviceProvider,
            StructuredHtmlPropertyOptions options,
            ITemplateResolverEvents resolverEvents
        )
        {
            _serviceProvider = serviceProvider;
            _options = options;
            _resolverEvents = resolverEvents;

            if (_options.Enabled)
                BindEvents();
        }

        public IPropertyConverter? Resolve(PropertyData propertyData)
        {
            if (_options.Enabled && propertyData is PropertyXhtmlString)
                return _serviceProvider.GetInstance<StructuredHtmlPropertyConverter>();
            return null;
        }

        private bool boundEvents = false;

        protected virtual void BindEvents()
        {
            _resolverEvents.TemplateResolving += ResolverEvents_TemplateResolving;
            _resolverEvents.TemplateResolved += ResolverEvents_TemplateResolved;
            boundEvents = true;
        }

        protected virtual void ReleaseEvents()
        {
            if (boundEvents)
            {
                boundEvents = false;
                _resolverEvents.TemplateResolving -= ResolverEvents_TemplateResolving;
                _resolverEvents.TemplateResolved -= ResolverEvents_TemplateResolved;
            }
        }

        private void ResolverEvents_TemplateResolving(object? sender, TemplateResolverEventArgs e)
        {
            
        }

        private void ResolverEvents_TemplateResolved(object? sender, TemplateResolverEventArgs e)
        {
            if (e.SelectedTemplate is null)
                e.SelectedTemplate = new()
                {
                    Name = "DefaultBlockTemplate",
                    DisplayName = "Default Block Template",
                    Description = "Default Block Template",
                    ModelType = e.RenderType,
                    TemplateType = typeof(DefaultBlockView),
                    Tags = e.Tags.ToArray(),
                    TemplateTypeCategory = TemplateTypeCategories.MvcPartialView,
                    Path = DefaultBlockView.DefaultPath
                };
        }

        

        public void Dispose()
        {
            GC.SuppressFinalize(this);
            ReleaseEvents();
        }

        public ValueTask DisposeAsync()
        {
            GC.SuppressFinalize(this);
            ReleaseEvents();
            return ValueTask.CompletedTask;
        }

        ~StructuredHtmlPropertyConverterProvider()
        {
            Dispose();
        }
    }
}
