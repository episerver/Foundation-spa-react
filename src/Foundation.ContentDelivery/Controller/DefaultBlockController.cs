using EPiServer.Core;
using EPiServer.Framework.DataAnnotations;
using EPiServer.Web.Mvc;
using Foundation.Cms.Blocks;
using System.Web.Mvc;

namespace Foundation.ContentDelivery.Controller
{
    [TemplateDescriptor(Inherited = true)]
    public class DefaultBlockController : BlockController<FoundationBlockData>
    {
        public override ActionResult Index(FoundationBlockData currentBlock)
        {
            return PartialView(currentBlock);
        }
    }
}