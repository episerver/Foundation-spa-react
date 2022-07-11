using Foundation.ContentActionsApi.Infrastructure;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace Foundation.ContentActionsApi.Controller
{
    [Controller]
    public class ContentActionApiErrorController : ControllerBase
    {
        protected string? ContentId 
        { 
            get
            {
                var contentId = Request.RouteValues["contentId"];
                return contentId is string current ? current : default;
            }
        }
        protected string? ContentType
        {
            get
            {
                var contentType = Request.RouteValues["contentType"];
                return contentType is string current ? current : default;
            }
        }

        protected IEnumerable<LanguageRequest> Langauges => Request.GetLanguageRequests().Where(x => !string.IsNullOrWhiteSpace(x.LanguageCode));
        protected CultureInfo SelectedLanguage => Request.GetLanguage();

        public ActionResult<object> RoutingError() => BadRequest();

        public ActionResult<object> ControllerNotFound()
        {
            return new NotFoundObjectResult(new
            {
                Error = "ControllerNotFound",
                ContentId,
                ContentType,
                Langauges,
                SelectedLanguage
            });
        }

        public ActionResult<object> ContentNotFound()
        {
            return new NotFoundObjectResult(new { 
                Error = "ContentNotFound",
                ContentId,
                Langauges,
                SelectedLanguage

            });
        }
        
        public ActionResult<object> ContentNotAuthorized() => Unauthorized();
    }
}
