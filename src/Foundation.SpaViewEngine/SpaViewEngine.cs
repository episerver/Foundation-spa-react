using EPiServer.Core;
using Foundation.SpaViewEngine.Configuration;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Foundation.SpaViewEngine
{
    public class SpaViewEngine : IViewEngine
    {
        protected SpaSettings Settings { get; set; }

        public SpaViewEngine(SpaSettings settings) => Settings = settings;

        public ViewEngineResult FindPartialView(ControllerContext controllerContext, string partialViewName, bool useCache) => new ViewEngineResult(new List<string>());

        public ViewEngineResult FindView(ControllerContext controllerContext, string viewName, string masterName, bool useCache)
        {
            var content = controllerContext.RequestContext.RouteData.DataTokens.FirstOrDefault(x => x.Key.Equals("routedData")).Value as IContent;
            if (content == null) //Only route iContent, or defined routes
            {
                return new ViewEngineResult(new List<string>());
            }
            string script = HttpContext.Current.Server.MapPath(Settings.GetConfigValue("server:script", "~\\Spa\\server.js"));
            string index =  HttpContext.Current.Server.MapPath(Settings.GetConfigValue("server:template", "~\\Spa\\index.html"));

            if (!(File.Exists(script) && File.Exists(index)))
            {
                return new ViewEngineResult(new List<string>());
            }
            var view = new SpaView(script, index);
            return new ViewEngineResult(view, this);
        }

        public void ReleaseView(ControllerContext controllerContext, IView view)
        {
            //Not implemented yet
            //throw new NotImplementedException();
        }
    }
}
