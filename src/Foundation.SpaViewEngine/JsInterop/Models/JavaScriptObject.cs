using System.Linq;
using System.Collections.Generic;
using System.Dynamic;
using JavaScriptEngineSwitcher.Core;

namespace Foundation.SpaViewEngine.JsInterop.Models
{
    public abstract class JavaScriptObject : DynamicObject
    {
        public Dictionary<string, object> CustomProperties = new Dictionary<string, object>();

        public override IEnumerable<string> GetDynamicMemberNames()
        {
            return CustomProperties.Select(x => x.Key);
        }

        public override bool TrySetMember(SetMemberBinder binder, object value)
        {
            CustomProperties[binder.Name] = value;
            return true;
        }

        public override bool TryGetMember(GetMemberBinder binder, out object result)
        {
            if (CustomProperties.ContainsKey(binder.Name))
            {
                result = CustomProperties[binder.Name];
                return true;
            }
            result = null;
            return false;
        }

        public override bool TryInvoke(InvokeBinder binder, object[] args, out object result)
        {
            result = this;
            return true;
        }

#pragma warning disable IDE1006 // Naming conventions between JavaScript and .Net are different
        public virtual string toString() => ToString();
#pragma warning restore IDE1006 // Naming conventions between JavaScript and .Net are different
    }
}
