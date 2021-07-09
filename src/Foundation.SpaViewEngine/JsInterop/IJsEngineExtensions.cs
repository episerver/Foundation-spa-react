using EPiServer.ServiceLocation;
using Foundation.SpaViewEngine.JsInterop.Models;
using JavaScriptEngineSwitcher.Core;
using System.Web.Mvc;

namespace Foundation.SpaViewEngine.JsInterop
{
    public static class IJsEngineExtensions
    {
        public const string InitialDataVariable = "__INITIAL__DATA__";
        public const string EpiserverApiVariable = "__EpiserverAPI__";
        public const string ResponseType = "ServerSideRenderingResponse";

        public static IJsEngine ApplyShims(this IJsEngine jsEngine) => jsEngine.ExecuteResource("Shims.js");
        public static IJsEngine AddWindowObject(this IJsEngine jsEngine) => jsEngine.ExecuteResource("window.js");
        public static IJsEngine AddCoreJS(this IJsEngine jsEngine) => jsEngine.ExecuteResource("core.js.minified.js");
        public static IJsEngine EnableConsole(this IJsEngine jsEngine)
        {
            jsEngine.EmbedHostObject("console", ServiceLocator.Current.GetInstance<Console>());
            return jsEngine;
        }

        public static IJsEngine EnableEpiserverAPI(this IJsEngine jsEngine, ServerSideRenderingContext context = null)
        {
            var api = ServiceLocator.Current.GetInstance<EpiserverAPI>();
            api.RenderingContext = context;
            jsEngine.EmbedHostObject(EpiserverApiVariable, api);
            jsEngine.EmbedHostType(ResponseType, typeof(SSRResponse));
            return jsEngine;
        }

        public static IJsEngine PrepareViewContext(this IJsEngine jsEngine) => jsEngine.ExecuteResource("PrepareContext.js");

        /// <summary>
        /// Set the view context on the JavaScript engine in preparation of the exection of the
        /// server script.
        /// </summary>
        /// <param name="jsEngine">The JavaScript engine to applie the ViewContext to</param>
        /// <param name="viewContext">The ViewContext to be applied</param>
        public static IJsEngine SetViewContext(this IJsEngine jsEngine, ServerSideRenderingContext renderContext)
        {
            dynamic dynamicContext = new ObjectWrapper(renderContext);
            jsEngine.EmbedHostObject(InitialDataVariable, dynamicContext);
            jsEngine.ExecuteResource("ApplyContext.js");
            return jsEngine;
        }

        public static IJsEngine ClearViewContext(this IJsEngine jsEngine)
        {
            jsEngine.RemoveVariable(InitialDataVariable);
            jsEngine.RemoveVariable(EpiserverApiVariable);
            jsEngine.ExecuteResource("ClearContext.js");
            if (jsEngine.SupportsGarbageCollection) jsEngine.CollectGarbage();
            return jsEngine;
        }

        public static IJsEngine ExecuteResource(this IJsEngine jsEngine, string resourceName)
        {
            var loader = new ResourceLoader();
            jsEngine.ExecuteResource(loader.BuildFullname(resourceName), loader.ResourceAssembly);
            return jsEngine;
        }
    }
}
