using EPiServer.Framework.Cache;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using EPiServer.Framework.Web.Resources;
using JavaScriptEngineSwitcher.Core;
using System;
using System.IO;
using System.Web.Mvc;
using Newtonsoft.Json;
using EPiServer.Logging;
using Foundation.SpaViewEngine.Infrastructure;
using Foundation.SpaViewEngine.JsInterop;
using Foundation.SpaViewEngine.JsInterop.Models;
using Foundation.SpaViewEngine.SpaContainer;
using EPiServer.Core;

namespace Foundation.SpaViewEngine
{
    public class SpaView : IView
    {
        private static readonly ILogger _logger = LogManager.GetLogger();
        protected readonly SpaSettings Settings;
        protected readonly SpaViewCache Cache;
        protected readonly IContextModeResolver ContextModeResolver;

        public SpaView(
            SpaSettings spaSettings,
            SpaViewCache spaViewCache,
            IContextModeResolver contextModeResolver
        ) {
            Settings = spaSettings;
            Cache = spaViewCache;
            ContextModeResolver = contextModeResolver;
        }

        protected virtual string HtmlTemplate {
            get
            {
                var media = SpaFolderHelper.GetDeploymentItem(Settings.BrowserContainerName);
                if (media == null) return string.Empty;
                var key = Cache.CreateCacheKey(Settings.BrowserContainerName + "\\" + Settings.HtmlTemplateName, CacheType.Asset, media);
                if (Cache.TryGet(key, ReadStrategy.Immediate, out string tpl))
                    return tpl;

                tpl = SpaFolderHelper.GetItemFromDeploymentAsString(media, Settings.HtmlTemplateName);
                Cache.Insert(key, tpl, media);
                return tpl;
            }
        }

        protected virtual string ServerJS {
            get
            {
                if (ServerContainer == null) return string.Empty;
                var key = Cache.CreateCacheKey(Settings.ServerContainerName + "\\" + Settings.ServerJsName, CacheType.Asset, ServerContainer);
                if (Cache.TryGet(key, ReadStrategy.Immediate, out string js))
                    return js;

                js = SpaFolderHelper.GetItemFromDeploymentAsString(ServerContainer, Settings.ServerJsName);
                Cache.Insert(key, js, ServerContainer);
                return js;
            }
        }

        protected virtual SpaMedia ServerContainer => SpaFolderHelper.GetDeploymentItem(Settings.ServerContainerName);

        public virtual void Render(ViewContext viewContext, TextWriter writer)
        {
            var renderData = new SpaViewRenderData();
            var cacheKey = Cache.CreateCacheKey(CacheType.RenderData, viewContext.GetRoutedContent());

            if (!ContextModeResolver.CurrentMode.EditOrPreview() && !Cache.TryGet(cacheKey, ReadStrategy.Immediate, out renderData))
            {
                renderData = new SpaViewRenderData();
                var jsEngine = GetJsEngine();
                var context = jsEngine.SetViewContext(viewContext);
                try
                {
                    jsEngine.Execute(ServerJS);
                    var result = (string)jsEngine.Evaluate("JSON.stringify(epi.render());");
                    renderData.Response = JsonConvert.DeserializeObject<SSRResponse>(result);
                }
                catch (Exception ex)
                {
                    if (_logger.IsErrorEnabled())
                        _logger.Error("Error while executing JavaScript", ex);
                    renderData.Response.Title = "<title>500: Error while server side rendering</title>";
                    renderData.Response.Body = ex.GetType().Name + " " + ex.Message;
                    renderData.IsError = true;
                }
                renderData.InitialData = context.AsJson();
                if (!renderData.IsError) Cache.Insert(cacheKey, renderData, new IContent[] { viewContext.GetRoutedContent(), ServerContainer });
            }

            writer.Write(ApplyReplacements(HtmlTemplate, renderData.Response, renderData.InitialData));
        }

        protected virtual string ApplyReplacements(string template, SSRResponse response, string context)
        {
            var header_resources = ClientResources.RenderRequiredResources("header");
            var footer_resources = ClientResources.RenderRequiredResources("footer");

            return template
                .Replace("<!--SSR-BODY-->", response.Body)
                .Replace("<!--SSR-CONTEXT-->", BuildContext(context))
                .Replace("data-attrs=\"html\"", response.HtmlAttributes)
                .Replace("data-attrs=\"body\"", response.BodyAttributes)
                .Replace("<!--SSR-TITLE-->", response.Title)
                .Replace("<!--SSR-META-->", response.Meta)
                .Replace("<!--SSR-LINK-->", response.Link)
                .Replace("<!--SSR-SCRIPT-->", response.Script)
                .Replace("<!--SSR-STYLE-->", response.Style)
                .Replace("<!--HEADER-RESOURCES-->", header_resources)
                .Replace("<!--FOOTER-RESOURCES-->", footer_resources);
        }

        protected virtual string BuildContext(string context) => "<script type=\"text/javascript\">var __INITIAL__DATA__ = " + context + ";</script>";

        protected virtual IJsEngine GetJsEngine() => ServiceLocator.Current.GetInstance<IJsEngine>();

        private string GetZipAssetString(string configKey, string defaultName, string filePath)
        {
            var assetName = Settings.GetConfigValue(configKey, defaultName);
            return SpaFolderHelper.GetItemFromDeploymentAsString(assetName, filePath);
        }
    }

    public class SpaViewRenderData
    {
        public virtual bool IsError { get; set; } = false;
        public virtual SSRResponse Response { get; set; } = new SSRResponse();
        public virtual string InitialData { get; set; } = "{}";
    }
}
