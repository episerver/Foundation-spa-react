using EPiServer.Core;
using EPiServer.Framework.DataAnnotations;
using EPiServer.Web.Mvc;
using System.Web.Mvc;

namespace Foundation.ContentDelivery.Controller
{
    [TemplateDescriptor(Inherited = true, Default = true)]
    public class PartialMediaController : PartialContentController<MediaData>
    {
        public override ActionResult Index(MediaData currentContent)
        {
            return PartialView(currentContent);
        }
    }
}