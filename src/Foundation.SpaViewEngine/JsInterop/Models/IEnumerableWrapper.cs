using System;
using System.Collections;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using EPiServer.Logging;
using Microsoft.ClearScript;
using Undefined = JavaScriptEngineSwitcher.Core.Undefined;

namespace Foundation.SpaViewEngine.JsInterop.Models
{
    public class IEnumerableWrapper<T> : DynamicObject, IEnumerable<T>
    {
        private static readonly ILogger _logger = LogManager.GetLogger();

        protected readonly IEnumerable<T> Wrapped;

        protected readonly Type WrappedObjectType;

        public IEnumerableWrapper(IEnumerable<T> toWrap)
        {
            Wrapped = toWrap;
            WrappedObjectType = toWrap.GetType();
        }

        public IEnumerableWrapper<object> Map(Func<T, object> callback)
        {
            return this.Select(callback).ToJSArray();
        }

        public IEnumerableWrapper<object> Map(Func<T, int, object> callback)
        {
            return this.Select(callback).ToJSArray();
        }

        public IEnumerableWrapper<object> Map(Func<T, int, IEnumerableWrapper<T>, object> callback)
        {
            return this.Select((x, i) => callback(x, i, this)).ToJSArray();
        }

        public IEnumerableWrapper<object> Map(ScriptObject scriptItem)
        {
            return this.Select((x, i) => scriptItem.Invoke(false, x, i, this)).ToJSArray();
        }

        public void ForEach(ScriptObject scriptItem)
        {
            var idx = 0;
            foreach (var value in this)
                scriptItem.Invoke(false, value, idx++, this);
        }

        public string Join(object separator)
        {
            return string.Join(separator.ToString(), this.Select(x => x.ToString()));
        }

        public IEnumerator<T> GetEnumerator() => Wrapped.GetEnumerator();

        IEnumerator IEnumerable.GetEnumerator() => ((IEnumerable)Wrapped).GetEnumerator();

        public override bool TryGetIndex(GetIndexBinder binder, object[] indexes, out object result)
        {
            var requestedIndex = indexes[0];
            if (int.TryParse(requestedIndex.ToString(), out var parsedIndex))
            {
                if (parsedIndex >= 0 && parsedIndex < this.Count())
                {
                    result = this.Skip(parsedIndex).Take(1).FirstOrDefault()?.ToJSSafeObject();
                    return true;
                }
            }
            result = null;
            return false;
        }

        public override IEnumerable<string> GetDynamicMemberNames() => GetType().GetMethods().Where(x => x.DeclaringType == GetType()).SelectMany(x => new string[] { x.Name, x.Name.FirstCharToLower() }).Concat(base.GetDynamicMemberNames());

        public override bool TryInvokeMember(InvokeMemberBinder binder, object[] args, out object result)
        {
            var method = GetType().GetMethods().Where(x => {
                if (!x.Name.Equals(binder.Name, StringComparison.OrdinalIgnoreCase))
                    return false;
                var methodParams = x.GetParameters();
                if (methodParams.Length != args.Length)
                    return false;

                return methodParams.All(p => p.ParameterType.IsAssignableFrom(args[p.Position].GetType()));
            }).FirstOrDefault();
            if (method == null)
            {
                result = Undefined.Value;
                if (_logger.IsErrorEnabled())
                    _logger.Error("Tried to invoke " + binder.Name + "("+ string.Join(", ", args.Select(x => x.GetType().FullName.Split('`').DefaultIfEmpty("-").FirstOrDefault())) +") but the method is not found on the wrapped class");
                return false;
            }

            result = method.Invoke(this, args).ToJSSafeObject();
            return true;
        }
    }
}
