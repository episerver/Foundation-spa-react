using EPiServer.Editor;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using Foundation.SpaViewEngine.JsInterop;
using Foundation.SpaViewEngine.JsInterop.Models;
using JavaScriptEngineSwitcher.Core;
using System.IO;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Foundation.SpaViewEngine
{
    public class SpaView : IView
    {
        protected virtual string ServerJS { get; set; }

        protected virtual string TemplateHtml { get; set; }

        protected virtual IJsEngine JsEngine { get; }

        private readonly ServiceAccessor<HttpContextBase> _httpContextAccessor;

        public SpaView(string serverJs, string templateHtml)
        {
            ServerJS = serverJs;
            TemplateHtml = templateHtml;
            JsEngine = ServiceLocator.Current.GetInstance<IJsEngine>();
            _httpContextAccessor = ServiceLocator.Current.GetInstance<ServiceAccessor<HttpContextBase>>();
        }

        public virtual void Render(ViewContext viewContext, TextWriter writer)
        {
            SSRResponse response;
            string initialData;
            var currentContextMode = GetContextMode();
            if (currentContextMode == ContextMode.Edit || currentContextMode == ContextMode.Preview)
            {
                //Disable server-side rendering for edit & preview due to errors in the Content-Delivery API when enabled.
                response = new SSRResponse();
                initialData = "{}";
            }
            else
            {
                var context = JsEngine.SetViewContext(viewContext);
                JsEngine.Execute(ServerJS);
                var result = (string)JsEngine.Evaluate("JSON.stringify(epi.render());");
                response = Newtonsoft.Json.JsonConvert.DeserializeObject<SSRResponse>(result);
                initialData = context.ToJson();
            }
            writer.Write(ApplyReplacements(LoadTemplate(), response, initialData));
        }

        protected virtual string ApplyReplacements(string template, SSRResponse response, string context)
        {
            var header_resources = EPiServer.Framework.Web.Resources.ClientResources.RenderRequiredResources("header");
            var footer_resources = EPiServer.Framework.Web.Resources.ClientResources.RenderRequiredResources("footer");

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

        protected virtual string BuildContext(string context)
        {
            var sb = new StringBuilder();
            sb.Append("<script type=\"text/javascript\">var __INITIAL__DATA__ = ");
            sb.Append(context);
            sb.Append(";</script>");
            return sb.ToString();
        }

        protected virtual string LoadTemplate() => TemplateHtml;

        /// <summary>
        /// The "epieditmode" querystring parameter is added to URLs by Episerver as a way to keep track of what context is currently active.
        /// If there is no "epieditmode" parameter we're in regular view mode.
        /// If the "epieditmode" parameter has value "True" we're in edit mode.
        /// If the "epieditmode" parameter has value "False" we're in preview mode.
        /// All of these different modes will resolve to different URLs for the same content.
        /// </summary>
        protected virtual ContextMode GetContextMode()
        {
            var httpCtx = _httpContextAccessor();
            if (httpCtx == null || httpCtx.Request == null || httpCtx.Request.QueryString[PageEditing.EpiEditMode] == null)
            {
                return ContextMode.Default;
            }
            if (bool.TryParse(httpCtx.Request.QueryString[PageEditing.EpiEditMode], out var editMode))
            {
                return editMode ? ContextMode.Edit : ContextMode.Preview;
            }
            return ContextMode.Undefined;
        }
    }
}
