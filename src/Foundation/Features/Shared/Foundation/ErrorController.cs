using Foundation.Helpers;
using System;
using System.Web.Mvc;

namespace Foundation.Features.Shared.Foundation
{
    public class ErrorController : Controller
    {

        [HttpGet]
        public ActionResult Index(Exception exception)
        {
            //Response.StatusCode = 500;
            var model = Url.GetUserViewModel("/", "Error");
            model.ErrorMessage = exception.Message;
            model.StackTrace = exception.StackTrace;
            return View("ErrorPage", model);
        }
    }
}