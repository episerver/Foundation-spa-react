using System;
using System.Collections.Generic;
using System.Linq;
using System.Dynamic;
using JavaScriptEngineSwitcher.Core;
using EPiServer.Logging;
using Foundation.SpaViewEngine;
using EPiServer.Core;
using EPiServer.ServiceLocation;
using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Models;

namespace Foundation.SpaViewEngine.JsInterop.Models
{
    /// <summary>
    /// Create a dynamic object from a defined object, allowing case insensitive access to 
    /// the properties of that object. This enables the difference in field name conventions
    /// to be overcome.
    /// </summary>
    public class ObjectWrapper : JavaScriptObject
    {
        private static readonly ILogger _logger = LogManager.GetLogger();

        private readonly object _wrappedObject;

        private Type WrappedObjectType => _wrappedObject.GetType();

        public ObjectWrapper(object wrappedObject)
        {
            _wrappedObject = wrappedObject;
        }

        public override IEnumerable<string> GetDynamicMemberNames()
        {
            var myProps = WrappedObjectType.GetProperties().Where(x => x.CanRead).SelectMany(x => new string[] { x.Name, x.Name.FirstCharToLower() });

            if (_wrappedObject is ContentApiModel contentApiModel)
            {
                var contentProps = contentApiModel.Properties.SelectMany(x => new string[] { x.Key, x.Key.FirstCharToLower() });
                myProps = myProps.Concat(contentProps);
            }

            var baseMembers = base.GetDynamicMemberNames();

            var allMembers = myProps.Concat(baseMembers);
            return allMembers;
        }

        public override bool TryGetMember(GetMemberBinder binder, out object result)
        {
            if (WrappedObjectType.TryGetPropertyByNameCI(binder.Name, out var prop))
            {
                result = MakeJavaScriptSafe(prop.GetValue(_wrappedObject));
                return true;
            }

            if (_wrappedObject is ContentApiModel contentApiModel && contentApiModel.Properties.Any(x => x.Key.Equals(binder.Name, StringComparison.OrdinalIgnoreCase)))
            {
                var propValue = contentApiModel.Properties.Where(x => x.Key.Equals(binder.Name, StringComparison.OrdinalIgnoreCase)).Select(x => x.Value).DefaultIfEmpty(Undefined.Value).FirstOrDefault();
                result = MakeJavaScriptSafe(propValue);
                return true;
            }

            return base.TryGetMember(binder, out result);
        }

        public override bool TryInvokeMember(InvokeMemberBinder binder, object[] args, out object result)
        {
            if (WrappedObjectType.TryGetMethodByNameCI(binder.Name, out var method))
            {
                result = Undefined.Value;
                if (_logger.IsErrorEnabled())
                    _logger.Error("Tried to invoke " + binder.Name + " but the method is not found on the wrapped class");
                return false;
            }

            result = MakeJavaScriptSafe(method.Invoke(_wrappedObject, args));
            return true;
        }

        public override string ToString()
        {
            return _wrappedObject.ToString();
            //return GetType().FullName + "<" + _wrappedObject.GetType().FullName +">";
        }

        protected static bool IsNativeJavaScriptType(Type resultType) => resultType.IsPrimitive || resultType.IsString();

        public static object MakeJavaScriptSafe(object inValue)
        {
            if (inValue == null) return null;
            if (Undefined.Value == inValue) return Undefined.Value;
            if (IsNativeJavaScriptType(inValue.GetType())) return inValue;
            if (inValue is INonWrappableObject nonWrappable) return nonWrappable;
            if (inValue is IEnumerable<object> ienum) return ienum.Select(x => MakeJavaScriptSafe(x)).ToJSArray();
            if (inValue is IContent iContent)
            {
                var mapper = ServiceLocator.Current.GetInstance<IContentModelMapper>();
                var model = mapper.TransformContent(iContent, true);
                return new ObjectWrapper(model);
            }
            return new ObjectWrapper(inValue);
        }
    }

    public interface INonWrappableObject { }
}
