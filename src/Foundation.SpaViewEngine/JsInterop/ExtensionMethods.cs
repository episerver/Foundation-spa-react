using EPiServer.ServiceLocation;
using Foundation.SpaViewEngine.JsInterop.Models;
using JavaScriptEngineSwitcher.Core;
using System;
using System.Web.Mvc;

namespace Foundation.SpaViewEngine.JsInterop
{
    public static class ExtensionMethods
    {
        public static void ApplyShims(this IJsEngine jsEngine) => ExecuteResource(jsEngine, "Shims.js");

        public static void AddWindowObject(this IJsEngine jsEngine) => ExecuteResource(jsEngine, "window.js");

        public static void EnableFetch(this IJsEngine jsEngine)
        {
            var impl = new Fetch();
            Func<string, object, object> fetchHostObject = (url, objParams) =>
            {
                return impl.DoFetch(url, objParams);
            };
            jsEngine.EmbedHostObject("fetch", fetchHostObject);
        }

        public static void EnableRequire(this IJsEngine jsEngine)
        {
            var impl = new Require(jsEngine);
            Func<string, object> requireHostObject = (item) =>
            {
                return impl.DoRequire(item);
            };
            jsEngine.EmbedHostObject("require", requireHostObject);
        }

        public static void EnableConsole(this IJsEngine jsEngine) => jsEngine.EmbedHostObject("console", new Console());

        /// <summary>
        /// Set the view context on the JavaScript engine in preparation of the exection of the
        /// server script.
        /// </summary>
        /// <param name="jsEngine">The JavaScript engine to applie the ViewContext to</param>
        /// <param name="viewContext">The ViewContext to be applied</param>
        public static ServerSideRenderingContext SetViewContext(this IJsEngine jsEngine, ViewContext viewContext)
        {
            var builder = ServiceLocator.Current.GetInstance<ServerSideRenderingContextBuilder>();
            var context = builder.Build(viewContext);
            ExecuteResource(jsEngine, "PrepareContext.js");
            jsEngine.EmbedHostObject("__INITIAL__DATA__", context);
            ExecuteResource(jsEngine, "ApplyContext.js");
            return context;
        }

        public static void ExecuteResource(IJsEngine jsEngine, string resourceName)
        {
            var loader = new ResourceLoader();
            jsEngine.ExecuteResource(loader.BuildFullname(resourceName), loader.ResourceAssembly);
        }
    }
}
