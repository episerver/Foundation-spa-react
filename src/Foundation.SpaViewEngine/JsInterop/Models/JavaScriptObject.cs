using System.Linq;
using System.Collections.Generic;
using System.Dynamic;
using Newtonsoft.Json;

namespace Foundation.SpaViewEngine.JsInterop.Models
{
    /// <summary>
    /// Basic helper object that allows adding properties to an object whilest in
    /// JavaScript context, using the DynamicObject of C#.
    /// </summary>
    public abstract class JavaScriptObject : DynamicObject
    {
        [JsonProperty]
        [JsonExtensionData]
        public virtual Dictionary<string, object> CustomProperties { get; set; } = new Dictionary<string, object>();

        public override IEnumerable<string> GetDynamicMemberNames()
        {
            return GetPropertyKeys();
        }

        public override bool TrySetMember(SetMemberBinder binder, object value)
        {
            SetProperty(binder.Name, value);
            return true;
        }

        public override bool TryGetMember(GetMemberBinder binder, out object result)
        {
            result = null;
            if (HasProperty(binder.Name))
            {
                result = GetProperty(binder.Name, null);
                return true;
            }
            return false;
        }

        public override bool TryGetIndex(GetIndexBinder binder, object[] indexes, out object result)
        {
            result = null;
            if (indexes.Length == 1 && HasProperty(indexes[0].ToString()))
            {
                result = GetProperty(indexes[0].ToString(), null);
                return true;    
            } 
            else if (indexes.All(x => HasProperty(x.ToString())))
            {
                result = indexes.Select(x => GetProperty(x.ToString()));
                return true;
            }
            return false;
        }

        public override bool TryInvoke(InvokeBinder binder, object[] args, out object result)
        {
            result = this;
            return true;
        }

        public virtual bool SetProperty(string customProperty, object value)
        {
            CustomProperties[customProperty] = value;
            return true;
        }

        public virtual object GetProperty(string customProperty, object defaultValue = null)
        {
            if (CustomProperties.ContainsKey(customProperty))
                return CustomProperties[customProperty];
            return defaultValue;
        }

        public virtual bool HasProperty(string customProperty)
        {
            return CustomProperties.ContainsKey(customProperty);
        }

        public virtual IEnumerable<string> GetPropertyKeys()
        {
            return CustomProperties.Keys;
        }

#pragma warning disable IDE1006 // Naming conventions between JavaScript and .Net are different
        public virtual string toString() => ToString();

        public virtual object valueOf() => this;
#pragma warning restore IDE1006 // Naming conventions between JavaScript and .Net are different
    }
}
