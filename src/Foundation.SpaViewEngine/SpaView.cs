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

        protected virtual IJsEngine GetJsEngine() => ServiceLocator.Current.GetInstance<IJsEngine>();

        protected virtual IContextModeResolver contextModeResolver => ServiceLocator.Current.GetInstance<IContextModeResolver>();

        protected virtual string LoadTemplate() => TemplateHtml;

        public SpaView(string serverJs, string templateHtml)
        {
            ServerJS = serverJs;
            TemplateHtml = templateHtml;
        }

        public virtual void Render(ViewContext viewContext, TextWriter writer)
        {
            SSRResponse response = new SSRResponse();
            string initialData = "{}";

            // Do not Pre-Render for Edit or Preview Mode, as there're some modules that will brake this
            if (!contextModeResolver.CurrentMode.EditOrPreview())
            {
                var jsEngine = GetJsEngine();
                var context = jsEngine.SetViewContext(viewContext);
                jsEngine.Execute(ServerJS);
                var result = (string)jsEngine.Evaluate("JSON.stringify(epi.render());");
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
    }
}
