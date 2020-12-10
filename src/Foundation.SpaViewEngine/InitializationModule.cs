using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;
using EPiServer.Web.Routing;
using EPiServer.Web.Routing.Segments;
using EPiServer.Web.Routing.Segments.Internal;
using Foundation.SpaViewEngine.JsInterop;
using Foundation.SpaViewEngine.SpaContainer;
using JavaScriptEngineSwitcher.Core;
using JavaScriptEngineSwitcher.V8;
using System.IO;
using System.Linq;
using System.Web;
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
            /*var spaRouter = new SpaPartialRouter();
            RouteTable.Routes.RegisterPartialRouter(spaRouter);

            string[] paths = { "app.html.spa", "app.server.spa" };

            foreach(var path in paths)
            {
                RouteTable.Routes.Add(new Route($"{path}/{{*path}}", new SpaRouteHandler(path)));
            }*/
            RouteTable.Routes.Add(new SpaViewAssetRoute());
            
        }

        public void Uninitialize(InitializationEngine context)
        {
            foreach (var engine in System.Web.Mvc.ViewEngines.Engines.OfType<SpaViewEngine>().ToArray())
            {
                System.Web.Mvc.ViewEngines.Engines.Remove(engine);
            }
        }
    }

    public class SpaViewAssetRoute : Route, IContentRoute
    {

        public string Name => "SpaViewAssetRoute";

        public SpaViewAssetRoute() : base("spaview/{container}/{*path}", new SpaRouteHandler())
        {

        }

        public override RouteData GetRouteData(HttpContextBase httpContext)
        {
            if (httpContext != null && httpContext.Items.Contains((object)RoutingConstants.HandledRouteDataKey))
                return httpContext.Items[(object)RoutingConstants.HandledRouteDataKey] as RouteData;

            string str = httpContext.Request.AppRelativeCurrentExecutionFilePath.Substring(2) + httpContext.Request.PathInfo;
            RequestSegmentContext requestSegmentContext1 = new RequestSegmentContext(httpContext, new RouteData((RouteBase)this, this.RouteHandler));
            requestSegmentContext1.RemainingPath = str;
            requestSegmentContext1.Defaults = Defaults;
            //requestSegmentContext1.StrictLanguageRoutingResolver = this.StrictLanguageRoutingResolver;
            RequestSegmentContext requestSegmentContext2 = requestSegmentContext1;
            //RoutingEventArgs routingEventArgs = new RoutingEventArgs((SegmentContext)requestSegmentContext2);
            //this.OnRoutingContent(routingEventArgs);
            //if (!routingEventArgs.CancelFurtherRouting)
            //{
                requestSegmentContext2.RouteData = this.RouteSegmentContext((SegmentContext)requestSegmentContext2);
                if (requestSegmentContext2.RouteData == null)
                    return (RouteData)null;
            //}
            if (!this.MatchConstraints((SegmentContext)requestSegmentContext2, httpContext))
                return (RouteData)null;
            //this._routeRedirector.EvaluateRequest((SegmentContext)requestSegmentContext2);
            //this.OnRoutedContent(routingEventArgs);
            return requestSegmentContext2.RouteData;
        }


        public bool MatchConstraints(SegmentContext segmentContext, HttpContextBase context)
        {
            if (segmentContext != null) return MatchSegmentConstraints(segmentContext);
            if (context != null) return MatchHttpContextConstraints(context);
            return false;
        }

        private bool MatchSegmentConstraints(SegmentContext segmentContext)
        {
            return (segmentContext.RoutedObject as SpaMedia) != null;
        }

        private bool MatchHttpContextConstraints(HttpContextBase context)
        {
            return false;
        }

        /**
         * First invoked during routing process, constructs route data 
         */
        public RouteData RouteSegmentContext(SegmentContext segmentContext)
        {
            var pathSegments = segmentContext.GetNextValue(segmentContext.GetNextValue(segmentContext.RemainingPath).Remaining);
            if (pathSegments.Remaining == null || pathSegments.Remaining.Length == 0) return null;
            var routedItem = SpaFolderHelper.GetDeploymentItem(pathSegments.Next);
            if (routedItem == null) return null;
            if (!SpaFolderHelper.HasItemInDeployment(routedItem, pathSegments.Remaining)) return null;


            segmentContext.RouteData.Values.Add("container", pathSegments.Next);
            segmentContext.RouteData.Values.Add("path", pathSegments.Remaining);
            segmentContext.RemainingPath = "";
            segmentContext.RoutedContentLink = routedItem.ContentLink;
            segmentContext.RoutedObject = routedItem;

            return segmentContext.RouteData;
            
        }
    }
}
