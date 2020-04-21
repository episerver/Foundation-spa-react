using EPiServer.Core;
using EPiServer.Framework.DataAnnotations;
using EPiServer.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Foundation.Infrastructure
{
    [TemplateDescriptor(Default = true, Inherited = true)]
    public class DefaultMediaController : PartialContentController<MediaData>
    {
        public override ActionResult Index(MediaData currentContent)
        {
            return PartialView(currentContent);
        }
    }
}