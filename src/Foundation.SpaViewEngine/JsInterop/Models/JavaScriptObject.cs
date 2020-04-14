using System.Collections.Generic;
using System.Dynamic;

namespace Foundation.SpaViewEngine.JsInterop.Models
{
    public abstract class JavaScriptObject : DynamicObject
    {
        protected Dictionary<string, object> CustomProperties = new Dictionary<string, object>();

        public override bool TrySetMember(SetMemberBinder binder, object value)
        {
            CustomProperties[binder.Name] = value;
            return true;
        }

        public override bool TryGetMember(GetMemberBinder binder,
                                  out object result)
        {
            result = CustomProperties.ContainsKey(binder.Name) ? CustomProperties[binder.Name] : null;
            return result == null ? false : true;
        }
    }
}
