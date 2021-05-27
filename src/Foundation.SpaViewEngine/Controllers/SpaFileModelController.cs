using EPiServer.Web;
using EPiServer.Web.Routing;
using Foundation.SpaViewEngine.SpaContainer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Foundation.SpaViewEngine.Controllers
{
    public class SpaFileModelController : Controller, IRenderTemplate<SpaFileModel>
    {
        public ActionResult Index()
        {
            var zippedContent = Request.RequestContext.GetRoutedData<SpaFileModel>();

            if(zippedContent.FileType.IndexOf("image", StringComparison.OrdinalIgnoreCase) > -1)
            {
                Response.ClearContent();
                Response.ContentType = zippedContent.FileType;
                Response.OutputStream.Write(zippedContent.FileBytes, 0, zippedContent.FileBytes.Length);
                Response.End();
                return null;
            }

            return File(zippedContent.FileBytes, zippedContent.FileType);
        }
    }
}
