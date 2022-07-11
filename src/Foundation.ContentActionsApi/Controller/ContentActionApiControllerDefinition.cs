/*using EPiServer.ContentApi.Core.Internal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MvcController = Microsoft.AspNetCore.Mvc.Controller;

namespace Foundation.ContentActionsApi.Controller
{
    [ApiController]
    [Route("api/episerver/v3.0/contentaction")]
    [ContentLanguageFilter]
    public class ContentActionController : MvcController
    {
        [HttpGet("{contentId}/{actionName?}/{*slug}")]
        public ActionResult<object> InvokeAction(
            [FromHeader(Name = "Accept-Language")] List<string> languages,
            ContentIdentifier contentId,
            string slug = "",
            string actionName = "Index"
        )
        {
            return Ok(new { contentId, actionName, languages, slug });
        }
    }
}
*/