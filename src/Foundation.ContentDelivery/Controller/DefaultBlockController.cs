using EPiServer.Core;
using EPiServer.Framework.DataAnnotations;
using EPiServer.Web.Mvc;
using System.Web.Mvc;

namespace Foundation.ContentDelivery.Controller
{
    [TemplateDescriptor(Inherited = true)]
    public class DefaultBlockController : BlockController<BlockData>
    {
        public override ActionResult Index(BlockData currentBlock)
        {
            return PartialView(currentBlock);
        }
    }
}