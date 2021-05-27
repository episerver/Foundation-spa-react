using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Internal;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.Core;
using EPiServer.ServiceLocation;
using EPiServer.SpecializedProperties;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.ContentDelivery.Models
{
    [ServiceConfiguration(typeof(IPropertyModelConverter), Lifecycle = ServiceInstanceScope.Singleton)]
    class ContentAreaPropertyModelConverter : DefaultPropertyModelConverter, IPropertyModelConverter
    {
        public override int SortOrder => 1000;

        public ContentAreaPropertyModelConverter() : base () { }

        public ContentAreaPropertyModelConverter(ReflectionService reflectionService) : base (reflectionService) { }

        protected override IEnumerable<TypeModel> InitializeModelTypes() => new TypeModel[] { new TypeModel {
            ModelType = typeof(ContentAreaPropertyModel),
            ModelTypeString = typeof(ContentAreaPropertyModel).FullName,
            PropertyType = typeof(PropertyContentArea)
        } };
    }
}
