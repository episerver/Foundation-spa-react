using System;
using System.Collections.Generic;
using System.Linq;
using System.Dynamic;
using JavaScriptEngineSwitcher.Core;
using EPiServer.Logging;
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

        public override bool TrySetMember(SetMemberBinder binder, object value)
        {
            if (WrappedObjectType.TryGetPropertyByNameCI(binder.Name, out var prop))
            {
                try
                {
                    prop.SetValue(_wrappedObject, value);
                    return true;
                } catch (Exception)
                {
                    return false;
                }
            }
            if (WrappedObjectType.TryGetMethodByNameCI("TrySetMember", out var methodInfo))
            {
                return (bool)methodInfo.Invoke(_wrappedObject, new object[] { binder, value });
            }

            return base.TrySetMember(binder, value);
        }

        public override bool TryGetMember(GetMemberBinder binder, out object result)
        {
            if (TryGetWrappedProperty(binder.Name, out result))
                return true;

            return base.TryGetMember(binder, out result);
        }

        public override bool TryGetIndex(GetIndexBinder binder, object[] indexes, out object result)
        {
            if (indexes.Length == 1 && TryGetWrappedProperty(indexes[0].ToString(), out result))
                return true;

            return base.TryGetIndex(binder, indexes, out result);
        }

        protected virtual bool TryGetWrappedProperty(string propertyName, out object result)
        {
            result = null;
            if (WrappedObjectType.TryGetPropertyByNameCI(propertyName, out var prop))
            {
                result = MakeJavaScriptSafe(prop.GetValue(_wrappedObject));
                return true;
            }
            if (_wrappedObject is IContentApiModel contentApiModel && contentApiModel.Properties.Any(x => x.Key.Equals(propertyName, StringComparison.OrdinalIgnoreCase)))
            {
                var propValue = contentApiModel.Properties.Where(x => x.Key.Equals(propertyName, StringComparison.OrdinalIgnoreCase)).Select(x => x.Value).DefaultIfEmpty(Undefined.Value).FirstOrDefault();
                result = MakeJavaScriptSafe(propValue);
                return true;
            }
            if (_wrappedObject is BlockPropertyModel blockPropertyModel && blockPropertyModel.Properties.Any(x => x.Key.Equals(propertyName, StringComparison.OrdinalIgnoreCase)))
            {
                var propValue = blockPropertyModel.Properties.Where(x => x.Key.Equals(propertyName, StringComparison.OrdinalIgnoreCase)).Select(x => x.Value).DefaultIfEmpty(Undefined.Value).FirstOrDefault();
                result = MakeJavaScriptSafe(propValue);
                return true;
            }
            return false;
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
            return GetType().Name + "<" + WrappedObjectType.FullName +">";
        }

        protected static bool IsNativeJavaScriptType(Type resultType) => resultType.IsPrimitive || resultType.IsString();

        public static object MakeJavaScriptSafe(object inValue)
        {
            if (inValue == null) return null;
            if (Undefined.Value == inValue) return Undefined.Value;
            if (IsNativeJavaScriptType(inValue.GetType())) return inValue;
            if (inValue is INonWrappableObject nonWrappable) return nonWrappable;
            if (inValue is IEnumerable<object> ienum) return ienum.Select(x => MakeJavaScriptSafe(x)).ToJSArray();
            if (inValue is IDictionary<string, ContentModelReference> dict) return new DictionaryWrapper<string, ContentModelReference>(dict);
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
