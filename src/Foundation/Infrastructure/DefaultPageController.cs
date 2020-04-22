using EPiServer.Core;
using EPiServer.Framework.DataAnnotations;
using EPiServer.Web.Mvc;
using System.Web.Mvc;

namespace Foundation.Infrastructure
{
    [TemplateDescriptor(Inherited = true, Default = true)]
    public class DefaultPageController : ContentController<PageData>
    {
        public ActionResult Index(PageData currentContent)
        {
            return View(currentContent);
        }
    }
}