using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using EPiServer.ServiceLocation;

namespace Foundation.SpaViewEngine.Models
{
    [ServiceConfiguration(ServiceType=typeof(ResultModelResolver), Lifecycle = ServiceInstanceScope.Singleton)]
    public class ResultModelResolver
    {
        public bool TryResolve(object controllerResult, out object viewModel)
        {
            viewModel = null;
            if (controllerResult is ViewResultBase viewControllerResult)
            {
                viewModel = viewControllerResult.Model;
                return true;
            }
            if (controllerResult is JsonResult jsonControllerResult)
            {
                viewModel = jsonControllerResult.Data;
                return true;
            }
            return false;
        }

        public object Resolve(ViewResultBase controllerResult)
        {
            return controllerResult.Model;
        }

        public object Resolve(JsonResult controllerResult)
        {
            return controllerResult.Data;
        }

        public async Task<object> ResultAwaiter(object controllerResult)
        {
            if (controllerResult is Task<ActionResult> taskActionResult)
                return await taskActionResult; 

            if (controllerResult is Task<ViewResult> taskViewResult)
                return await taskViewResult;

            return controllerResult;
        }
    }
}
