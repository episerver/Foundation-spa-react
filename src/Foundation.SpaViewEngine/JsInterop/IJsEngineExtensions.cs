using EPiServer.ServiceLocation;
using Foundation.SpaViewEngine.JsInterop.Models;
using JavaScriptEngineSwitcher.Core;
using System.Web.Mvc;

namespace Foundation.SpaViewEngine.JsInterop
{
    public static class IJsEngineExtensions
    {
        public static void ApplyShims(this IJsEngine jsEngine) => jsEngine.ExecuteResource("Shims.js");
        public static void AddWindowObject(this IJsEngine jsEngine) => jsEngine.ExecuteResource("window.js");
        public static void AddCoreJS(this IJsEngine jsEngine) => jsEngine.ExecuteResource("core.js.minified.js");
        public static void EnableConsole(this IJsEngine jsEngine) => jsEngine.EmbedHostObject("console", ServiceLocator.Current.GetInstance<Console>());
        public static void EnableEpiserverAPI(this IJsEngine jsEngine, ServerSideRenderingContext context)
        {
            var api = ServiceLocator.Current.GetInstance<EpiserverAPI>();
            api.RenderingContext = context;
            jsEngine.EmbedHostObject("__EpiserverAPI__", api);
        }

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
            dynamic dynamicContext = new ObjectWrapper(context);
            jsEngine.ExecuteResource("PrepareContext.js");
            jsEngine.EmbedHostObject("__INITIAL__DATA__", dynamicContext);
            jsEngine.ExecuteResource("ApplyContext.js");
            jsEngine.EnableEpiserverAPI(context);
            return context;
        }

        public static void ExecuteResource(this IJsEngine jsEngine, string resourceName)
        {
            var loader = new ResourceLoader();
            jsEngine.ExecuteResource(loader.BuildFullname(resourceName), loader.ResourceAssembly);
        }
    }
}
