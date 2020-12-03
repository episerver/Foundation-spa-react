using EPiServer.Core;
using Foundation.SpaViewEngine.Configuration;
using Foundation.SpaViewEngine.SpaContainer;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Foundation.SpaViewEngine
{
    public class SpaViewEngine : IViewEngine
    {
        protected SpaSettings Settings { get; set; }

        public SpaViewEngine(SpaSettings settings) => Settings = settings;

        public ViewEngineResult FindPartialView(ControllerContext controllerContext, string partialViewName, bool useCache) => CreateSpaView(controllerContext);

        public ViewEngineResult FindView(ControllerContext controllerContext, string viewName, string masterName, bool useCache) => CreateSpaView(controllerContext);
        

        private ViewEngineResult CreateSpaView(ControllerContext controllerContext)
        {
            var content = controllerContext.RequestContext.RouteData.DataTokens.FirstOrDefault(x => x.Key.Equals("routedData")).Value as IContent;
            if (content == null) //Only route iContent, or defined routes
            {
                return GetStaticSpaView(controllerContext);
            }

            var serverJsContents = GetZipAssetString("server:script", "app.server.spa", "server.js");
            var indexHtmlContents = GetZipAssetString("server:template", "app.html.spa", "index.html");

            if (string.IsNullOrEmpty(serverJsContents) || string.IsNullOrEmpty(indexHtmlContents))
                return new ViewEngineResult(new List<string>());

            var view = new SpaView(serverJsContents, indexHtmlContents);

            return new ViewEngineResult(view, this);
        }

        private ViewEngineResult GetStaticSpaView(ControllerContext controllerContext)
        {
            if (controllerContext.HttpContext.Request.Url.ToString().Contains("Spa"))
                return new ViewEngineResult(new List<string>());
            return new ViewEngineResult(new List<string>());
        }

        public void ReleaseView(ControllerContext controllerContext, IView view)
        {
            //Not implemented yet
            //throw new NotImplementedException();
        }

        private string GetZipAssetString(string configKey, string defaultName, string filePath)
        {
            var assetName = Settings.GetConfigValue(configKey, defaultName);
            return SpaFolderHelper.GetItemFromDeploymentAsString(assetName, filePath);
        }
    }
}
