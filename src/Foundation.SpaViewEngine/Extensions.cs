using EPiServer.Core;
using Foundation.SpaViewEngine.JsInterop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web.Mvc;
using System.Web.Routing;

namespace Foundation.SpaViewEngine
{
    public static class RequestContextExtensions
    {

        public static bool TryGetRoutedContent(this RequestContext context, out IContent iContent)
        {
            iContent = null;
            if (context.RouteData.DataTokens
                .DefaultIfEmpty(new KeyValuePair<string, object>(string.Empty, null))
                .FirstOrDefault(x => x.Key.Equals("routedData")).Value is IContent routedContent)
            {
                iContent = routedContent;
                return true;
            }
            return false;
        }
    }

    public static class TypeExtensions
    {
        public static bool ImplementsInterface(this Type myType, Type interfaceType)
        {
            if (!interfaceType.IsInterface)
                throw new ArgumentException(interfaceType.FullName + " is not an inteface", "interfaceType");

            var types = myType.FindInterfaces(CreateFullnameTypeFilter(), interfaceType.FullName);
            return types.Length > 0;
        }

        public static bool IsIEnumberable<T>(this Type myType)
        {
            return typeof(IEnumerable<T>).IsAssignableFrom(myType);
        }

        public static bool IsString(this Type myType)
        {
            return typeof(string).IsAssignableFrom(myType);
        }

        public static TypeFilter CreateFullnameTypeFilter() => new TypeFilter((Type toTest, object fullName) => toTest.FullName.Equals(fullName.ToString()) || toTest.FullName.StartsWith(fullName.ToString() + "`"));

        public static bool TryGetMethodByNameCI(this Type myType, string methodName, out MethodInfo methodInfo)
        {
            methodInfo = myType.GetMethods().Where(x => string.Equals(x.Name, methodName, StringComparison.OrdinalIgnoreCase)).FirstOrDefault();
            return methodInfo != null;
        }

        public static MethodInfo GetMethodByNameCI(this Type myType, string methodName)
        {
            return myType.GetMethods().Where(x => string.Equals(x.Name, methodName, StringComparison.OrdinalIgnoreCase)).FirstOrDefault();
        }

        public static bool TryGetPropertyByNameCI(this Type myType, string propertyName, out PropertyInfo propertyInfo)
        {
            propertyInfo = myType.GetProperties().Where(x => string.Equals(x.Name, propertyName, StringComparison.OrdinalIgnoreCase)).FirstOrDefault();
            return propertyInfo != null;
        }

        public static PropertyInfo GetPropertyByNameCI(this Type myType, string propertyName)
        {
            return myType.GetProperties().Where(x => string.Equals(x.Name, propertyName, StringComparison.OrdinalIgnoreCase)).FirstOrDefault();
        }
    }
    public static class ViewContextExtensions
    {
        public static string CreateCacheKey(this ViewContext viewContext) => viewContext.CreateCacheKey(string.Empty);

        public static string CreateCacheKey(this ViewContext viewContext, string subKey)
        {
            return "SpaViewEngine::ViewContext::" +
                viewContext.GetRoutedContent().ContentGuid.ToString() +
                (string.IsNullOrWhiteSpace(subKey) ? "" : "::" + subKey);
        }

        public static IContent GetRoutedContent(this ViewContext viewContext)
        {
            viewContext.RequestContext.TryGetRoutedContent(out var iContent);
            return iContent;
        }
    }

    public static class StringExtensions
    {
        public static string FirstCharToLower(this string name)
        {
            return char.ToLowerInvariant(name[0]) + name.Substring(1);
        }
    }

    public static class IEnumerableExtensions
    {
        public static IEnumerableWrapper<T> ToJSArray<T>(this IEnumerable<T> toWrap) => typeof(IEnumerableWrapper<T>).IsAssignableFrom(toWrap.GetType()) ? (IEnumerableWrapper<T>)toWrap : new IEnumerableWrapper<T>(toWrap);
    }

    public static class ObjectExtension
    {
        public static object ToJSSafeObject(this object toProcess) => ObjectWrapper.MakeJavaScriptSafe(toProcess);

        public static bool IsDictionary(this object toCheck)
        {
            return toCheck.GetType().FullName.StartsWith("System.Collections.Generic.Dictionary`2");
        }
    }
}
