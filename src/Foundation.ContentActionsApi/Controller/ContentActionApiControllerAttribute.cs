using EPiServer.Core;
using System;

namespace Foundation.ContentActionsApi.Controller
{

    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    public class ContentActionApiControllerAttribute : Attribute
    {
        public Type ContentType { get; }

        public bool Strict { get; set; } = true;

        public ContentActionApiControllerAttribute(Type contentType)
        {
            if (!contentType.IsAssignableTo(typeof(IContentData)))
                throw new ArgumentException("The ContentType must be assignable to IContentData", nameof(contentType));
            ContentType = contentType;
        }

        public bool IsControllerFor(Type dataType, bool strict) => strict ? dataType == ContentType : dataType.IsAssignableTo(ContentType);
        public bool IsControllerFor(Type dataType) => IsControllerFor(dataType, Strict);
        public bool IsControllerFor<T>() => IsControllerFor(typeof(T));
    }
}
