using System;
using System.Linq;
using EPiServer;
using EPiServer.ContentApi.Core.Serialization;
using EPiServer.Core;
using EPiServer.ServiceLocation;
using Foundation.SpaViewEngine.JsInterop.Models;

namespace Foundation.SpaViewEngine.JsInterop
{
    [ServiceConfiguration(ServiceType = typeof(EpiserverAPI), Lifecycle = ServiceInstanceScope.Transient)]
    public class EpiserverAPI : INonWrappableObject
    {
        protected IContentLoader ContentLoader => ServiceLocator.Current.GetInstance<IContentLoader>();
        protected IContentModelMapper ContentModelMapper => ServiceLocator.Current.GetInstance<IContentModelMapper>();

        public ServerSideRenderingContext RenderingContext { get; set; } = null;

        public object GetService(string typeName)
        {
            var type = FindType(typeName);
            return ServiceLocator.Current.GetInstance(type);
        }

        public object MakeSafe(object inValue)
        {
            var outValue = inValue.ToJSSafeObject();
            return outValue;
        }

        public object LoadIContent(string complexReference, string expand = "")
        {
            if (ContentReference.TryParse(complexReference, out var reference))
            {
                var iContent = ContentLoader.Get<IContent>(reference);
                if (iContent == null)
                    return null;
                var model = ContentModelMapper.TransformContent(iContent, true, expand);
                if (RenderingContext != null)
                {
                    var first = RenderingContext.Contents.FirstOrDefault(x => x.ContentLink.GuidValue == model.ContentLink.GuidValue);
                    if (first != null) RenderingContext.Contents.Remove(first);
                    RenderingContext.Contents.Add(model);
                }
                return model.ToJSSafeObject();
            }
            return null;
        }

        private static Type FindType(string fullName)
        {
            return
                AppDomain.CurrentDomain.GetAssemblies()
                    .Where(a => !a.IsDynamic)
                    .SelectMany(a => a.GetTypes())
                    .FirstOrDefault(t => t.FullName.Equals(fullName, StringComparison.OrdinalIgnoreCase));
        }
    }
}
