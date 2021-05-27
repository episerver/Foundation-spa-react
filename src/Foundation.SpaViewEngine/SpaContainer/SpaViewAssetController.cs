using System.Web.Mvc;
using System.Web.UI;
using System.Web;

namespace Foundation.SpaViewEngine.SpaContainer
{
    [HandleError]
    public class SpaViewAssetController : Controller
    {

        [HttpGet]
        [OutputCache(Duration = 31536000, VaryByHeader = "Accept-Encoding", Location = OutputCacheLocation.Any)]
        public ActionResult Index(string container, string path)
        {
            var spacontainer = SpaFolderHelper.GetDeploymentItem(container);
            if (spacontainer == null) return HttpNotFound();
            if (!SpaFolderHelper.HasItemInDeployment(spacontainer, path)) return HttpNotFound();
            var mimetype = MimeMapping.GetMimeMapping(path);
            Response.Cookies.Clear(); // Remove Cookies from response so output will be cached by CDN
            return new FileStreamResult(SpaFolderHelper.GetItemFromDeploymentAsStream(spacontainer, path), mimetype);
        }
    }
}
