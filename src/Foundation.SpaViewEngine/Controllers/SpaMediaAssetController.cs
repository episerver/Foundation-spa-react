using Foundation.SpaViewEngine.SpaContainer;
using System.Linq;
using System.Web.Mvc;
using System.Web.UI;
using System.Web;

namespace Foundation.SpaViewEngine.Controllers
{
    [HandleError]
    public class SpaMediaAssetController : Controller
    {

        [HttpGet]
        [OutputCache(Duration = 63072000, Location = OutputCacheLocation.Any)]
        public ActionResult Index(string container, string path)
        {
            var spacontainer = SpaFolderHelper.GetDeploymentItem(container);
            if (spacontainer == null) return HttpNotFound();
            if (!spacontainer.HasAsset(path)) return HttpNotFound();
            var mimetype = MimeMapping.GetMimeMapping(path);
            Response.Headers.Add("X-Content-Type-Options", "nosniff");
            Response.Headers.Add("Cache-Control", "public, immutable, max-age=31536000");
            if (Response.Headers.AllKeys.Contains("x-xss-protection"))
                Response.Headers.Remove("x-xss-protection");
            Response.Cookies.Clear(); // Remove Cookies from response so output will be cached by CDN
            return new FileStreamResult(spacontainer.GetAssetAsStream(path), mimetype);
        }
    }
}
