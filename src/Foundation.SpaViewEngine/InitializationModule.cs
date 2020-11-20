using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;
using EPiServer.Web.Routing;
using Foundation.SpaViewEngine.JsInterop;
using Foundation.SpaViewEngine.SpaContainer;
using JavaScriptEngineSwitcher.Core;
using JavaScriptEngineSwitcher.V8;
using System.Linq;
using System.Web.Hosting;
using System.Web.Routing;

namespace Foundation.SpaViewEngine
{
    [InitializableModule]
    public class InitializationModule : IConfigurableModule
    {
        /// <summary>
        /// Setup the container to use the ClearScript.V8 JavaScript engine by default. All instances
        /// are loaded through the container, enabling full configuration by using the container 
        /// configuraiton in your implementation.
        /// </summary>
        /// <param name="context">The container context to configure</param>
        public void ConfigureContainer(ServiceConfigurationContext context)
        {
            //Register V8 Config
            context.Services.AddSingleton(_ => new V8Settings());
            context.Services.AddSingleton(locator => new V8JsEngineFactory(locator.GetInstance<V8Settings>()));

            context.Services.AddSingleton<IJsEngineSwitcher>(locator =>
            {
                var switcher = new JsEngineSwitcher();
                var engineFactory = locator.GetInstance<V8JsEngineFactory>();
                switcher.EngineFactories.Add(engineFactory);
                switcher.DefaultEngineName = engineFactory.EngineName;
                JsEngineSwitcher.Current = switcher;
                return switcher;
            });

            context.Services.AddTransient(locator =>
            {
                var engine = locator.GetInstance<IJsEngineSwitcher>().CreateDefaultEngine();
                engine.ApplyShims();
                engine.AddWindowObject();
                engine.EnableConsole();
                return engine;
            });
        }

        public void Initialize(InitializationEngine context) { 
            
            System.Web.Mvc.ViewEngines.Engines.Insert(0, context.Locate.Advanced.GetInstance<SpaViewEngine>());

            // Initialize SPA Router
            var spaRouter = new SpaPartialRouter();
            RouteTable.Routes.RegisterPartialRouter(spaRouter);

            string[] paths = { "app.html.spa", "app.server.spa" };

            foreach(var path in paths)
            {
                RouteTable.Routes.Add(new Route($"{path}/{{*path}}", new SpaRouteHandler(path)));
            }
            
        }

        public void Uninitialize(InitializationEngine context)
        {
            foreach (var engine in System.Web.Mvc.ViewEngines.Engines.OfType<SpaViewEngine>().ToArray())
            {
                System.Web.Mvc.ViewEngines.Engines.Remove(engine);
            }
        }
    }
}
