using Foundation.Cms.Attributes;
using Foundation.Features.ErrorPage;
using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.UI;

namespace Foundation
{
    public class EPiServerApplication : EPiServer.Global
    {
        protected void Application_Start()
        {
            MvcHandler.DisableMvcResponseHeader = true;
            AreaRegistration.RegisterAllAreas();
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof(LocalizedRequiredAttribute), typeof(RequiredAttributeAdapter));
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof(LocalizedRegularExpressionAttribute), typeof(RegularExpressionAttributeAdapter));
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof(LocalizedEmailAttribute), typeof(RegularExpressionAttributeAdapter));
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof(LocalizedStringLengthAttribute), typeof(StringLengthAttributeAdapter));
            ScriptManager.ScriptResourceMapping.AddDefinition("jquery", new ScriptResourceDefinition
            {
                Path = "~/Assets/js/vendors/jquery/jquery-3.4.0.min.js",
            });
        }

        protected override void RegisterRoutes(RouteCollection routes)
        {
            base.RegisterRoutes(routes);

            routes.MapRoute(
              name: "Default",
              url: "{controller}/{action}/{id}",
              defaults: new { action = "Index", id = UrlParameter.Optional });

            try
            {
                //Workaroud / hack to make Siteattention work
                routes.MapRoute("SaPropertyRender/Render", "SaPropertyRender/Render", new
                {
                    controller = "SaPropertyRender",
                    action = "Render"
                });
                routes.MapRoute("SaSettingsSave/Get", "SaSettingsSave/Get", new
                {
                    controller = "SaSettingsSave",
                    action = "Get"
                });
                routes.MapRoute("SaSettingsSave/Post", "SaSettingsSave/Post", new
                {
                    controller = "SaSettingsSave",
                    action = "Post"
                });
            }
            catch
            {
            }

        }

        protected void Application_Error(object sender, EventArgs e)
        {
            // Grab information about the last error occurred 
            var exception = Server.GetLastError();

            // Clear the response stream 
            var httpContext = ((HttpApplication)sender).Context;
            httpContext.Response.Clear();
            httpContext.ClearError();
            httpContext.Response.TrySkipIisCustomErrors = true;
            var routeData = new RouteData();
            routeData.Values["controller"] = "error";
            routeData.Values["action"] = "index";
            routeData.Values["exception"] = exception;
            using (var controller = new ErrorController())
            {
                ((IController)controller).Execute(
                new RequestContext(new HttpContextWrapper(httpContext), routeData));
            }
        }
    }
}