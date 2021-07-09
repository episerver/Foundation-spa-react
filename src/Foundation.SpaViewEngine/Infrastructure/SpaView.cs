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
using Foundation.SpaViewEngine.JsInterop;
using Foundation.SpaViewEngine.JsInterop.Models;
using Foundation.SpaViewEngine.SpaContainer;
using EPiServer.Core;
using System.Text;
using System.Text.RegularExpressions;

namespace Foundation.SpaViewEngine.Infrastructure
{
    public class SpaView : IView
    {
        private static readonly ILogger _logger = LogManager.GetLogger();
        protected readonly SpaSettings Settings;
        protected readonly SpaViewCache Cache;
        protected readonly IContextModeResolver ContextModeResolver;
        protected readonly ServerSideRenderingContextBuilder RenderingContextBuilder;

        protected virtual string HtmlTemplate
        {
            get
            {
                if (BrowserContainer == null) return string.Empty;
                var key = Cache.CreateCacheKey(Settings.BrowserContainerName + "\\" + Settings.HtmlTemplateName, CacheType.Asset, BrowserContainer);
                if (Cache.TryGet(key, ReadStrategy.Immediate, out string tpl) && !string.IsNullOrWhiteSpace(tpl))
                    return tpl;

                tpl = BrowserContainer?.GetAssetAsString(Settings.HtmlTemplateName, false) ?? string.Empty;
                Cache.Insert(key, tpl, new SpaMedia[] { BrowserContainer });
                return tpl;
            }
        }

        protected virtual string ServerJS
        {
            get
            {
                if (ServerContainer == null) return string.Empty;
                var key = Cache.CreateCacheKey(Settings.ServerContainerName + "\\" + Settings.ServerJsName, CacheType.Asset, ServerContainer);
                if (Cache.TryGet(key, ReadStrategy.Immediate, out string js) && !string.IsNullOrWhiteSpace(js))
                    return js;

                js = ServerContainer?.GetAssetAsString(Settings.ServerJsName, false) ?? string.Empty;
                Cache.Insert(key, js, new SpaMedia[] { ServerContainer });
                return js;
            }
        }

        protected virtual SpaMedia ServerContainer => SpaFolderHelper.GetDeploymentItem(Settings.ServerContainerName);
        protected virtual SpaMedia BrowserContainer => SpaFolderHelper.GetDeploymentItem(Settings.BrowserContainerName);

        public SpaView(
            SpaSettings spaSettings,
            SpaViewCache spaViewCache,
            IContextModeResolver contextModeResolver,
            ServerSideRenderingContextBuilder renderingContextBuilder
        ) {
            Settings = spaSettings;
            Cache = spaViewCache;
            ContextModeResolver = contextModeResolver;
            RenderingContextBuilder = renderingContextBuilder;
        }

        public virtual void Render(ViewContext viewContext, TextWriter writer)
        {
            if (ContextModeResolver.CurrentMode.EditOrPreview())
            {
                writer.Write(InjectClientResources(HtmlTemplate));
                return;
            }

            var cacheKey = Cache.CreateCacheKey(CacheType.RenderData, viewContext.GetRoutedContent());
            SpaViewRenderData renderData;
            if (!Cache.TryGet(cacheKey, ReadStrategy.Immediate, out renderData))
            {
                renderData = new SpaViewRenderData();
                var context = RenderingContextBuilder.Build(viewContext);
                using (var jsEngine = GetJsEngine())
                {
                    try
                    {
                        jsEngine.EnableEpiserverAPI(context);
                        jsEngine.SetViewContext(context);
                        renderData.Response = SSRResponse.Create(jsEngine.CallFunction("render"));
                    }
                    catch (Exception ex)
                    {
                        if (_logger.IsErrorEnabled())
                            _logger.Error("Error while executing JavaScript", ex);
                        renderData.Response.Title = "<title>500: Error while server side rendering</title>";
                        renderData.Response.Body = ex.GetType().Name + " " + ex.Message;
                        renderData.IsError = true;
                    }
                    finally
                    {
                        jsEngine.ClearViewContext();
                    }
                }
                renderData.InitialData = context.AsJson();
                renderData.PageHtml = InjectClientResources(
                        ApplyReplacements(
                            HtmlTemplate,
                            renderData.Response,
                            renderData.InitialData
                        )
                );
                if (!renderData.IsError) Cache.Insert(cacheKey, renderData, new IContent[] { viewContext.GetRoutedContent(), ServerContainer, BrowserContainer });
            }

            writer.Write(renderData.PageHtml);
        }

        protected virtual string ApplyReplacements(string template, SSRResponse response, string context)
        {
            return template
                .Replace("<div id=\"epi-page-container\"></div>", "<div id=\"epi-page-container\">" + response.Body + "</div>")
                .ReplaceSsrMeta("context", BuildContext(context))
                .Replace("data-attrs=\"html\"", response.HtmlAttributes)
                .Replace("data-attrs=\"body\"", response.BodyAttributes)
                .RegexReplace("<title>.*?<\\/title>", response.Title)
                .ReplaceSsrMeta("meta", response.Meta)
                .ReplaceSsrMeta("link", response.Link)
                .ReplaceSsrMeta("script", response.Script)
                .ReplaceSsrMeta("style", response.Style);
        }

        protected virtual string InjectClientResources(string template)
        {
            var header_resources = ClientResources.RenderRequiredResources("header");
            var footer_resources = ClientResources.RenderRequiredResources("footer");

            return template
                .InjectBefore("</head>", header_resources)
                .InjectBefore("</body", footer_resources);
        }

        protected virtual string BuildContext(string context) => "<script type=\"text/javascript\">var __INITIAL__DATA__ = {status: 'loading' };</script><script type=\"text/javascript\" async defer>__INITIAL__DATA__ = " + context + "; __INITIAL__DATA__.status = 'available'; if (__INITIAL__DATA__.onReady) __INITIAL__DATA__.onReady();</script>";

        protected virtual IJsEngine GetJsEngine()
        {
            var jsEngine = ServiceLocator.Current.GetInstance<IJsEngine>();
            jsEngine.PrepareViewContext();
            jsEngine.Execute(ServerJS);
            return jsEngine;
        }
    }

    public static class StringRenderExtension
    {
        public static string ReplaceSsrMeta(this string template, string key, string value) => string.IsNullOrWhiteSpace(value) ? template : template.Replace("<meta name=\"x-ssr-replace\" content=\"" + key + "\">", value);

        public static string InjectBefore(this string template, string search, string value) => string.IsNullOrWhiteSpace(value) ? template : template.Replace(search, value + search);

        public static string RegexReplace(this string template, string pattern, string value) => string.IsNullOrWhiteSpace(value) ? template : new Regex(pattern).Replace(template, value);
    }

    public class SpaViewRenderData
    {
        public virtual bool IsError { get; set; } = false;
        public virtual SSRResponse Response { get; set; } = new SSRResponse();
        public virtual string InitialData { get; set; } = "{}";
        public virtual string PageHtml { get; set; } = "";
    }
}
