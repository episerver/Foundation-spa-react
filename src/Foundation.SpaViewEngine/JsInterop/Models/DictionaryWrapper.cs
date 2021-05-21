using System;
using System.Collections.Generic;
using System.Linq;

namespace Foundation.SpaViewEngine.JsInterop.Models
{
    public class DictionaryWrapper<TKey, TValue> : JavaScriptObject
    {
        public IDictionary<TKey, TValue> RawData { get; }

        public Type RawDataType => RawData.GetType();

        public DictionaryWrapper (IDictionary<TKey, TValue> toWrap)
        {
            RawData = toWrap;
        }

        public override IEnumerable<string> GetPropertyKeys()
        {
            return RawData.Keys.SelectMany(x => new string[] { x.ToString(), x.ToString().FirstCharToLower() }).Concat(base.GetPropertyKeys());
        }

        public override bool HasProperty(string customProperty)
        {
            return RawData.Keys.Any(x => x.ToString().Equals(customProperty, StringComparison.OrdinalIgnoreCase)) || base.HasProperty(customProperty);
        }

        public override object GetProperty(string customProperty, object defaultValue = null)
        {
            if (RawData.Keys.Any(x => x.ToString().Equals(customProperty, StringComparison.OrdinalIgnoreCase)))
                return RawData.Where(x => x.Key.ToString().Equals(customProperty, StringComparison.OrdinalIgnoreCase)).Select(x => x.Value).FirstOrDefault().ToJSSafeObject();

            return base.GetProperty(customProperty, defaultValue);
        }

        public override string ToString()
        {
            return GetType().Name + "<" + RawDataType.FullName + ">";
        }
    }
}
