using EPiServer.Core;
using EPiServer.Framework.DataAnnotations;
using EPiServer.Web.Mvc;
using System.Web.Mvc;

namespace Foundation.Infrastructure
{
    [TemplateDescriptor(Default = true, Inherited = true)]
    public class DefaultContentController : ContentController<PageData>
    {
        public ActionResult Index(IContent currentContent)
        {
            return View(currentContent);
        }
    }
}