using Foundation.SpaViewEngine.SpaContainer;
using System.Web;
using System.Web.Routing;

namespace Foundation.SpaViewEngine
{
    public class SpaViewAssetRouteHandler : IRouteHandler
    {
        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            return new SpaViewAssetHttpHandler();
        }
    }
}
