using EPiServer.Core;
using EPiServer.Framework.DataAnnotations;
using EPiServer.Web.Mvc;
using System.Web.Mvc;

namespace Foundation.Infrastructure
{
    [TemplateDescriptor(Default = true, Inherited = true)]
    public class DefaultBlockController : BlockController<BlockData>
    {
        public override ActionResult Index(BlockData currentBlock)
        {
            return PartialView(currentBlock);
        }
    }
}