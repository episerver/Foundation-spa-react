using EPiServer;
using EPiServer.Find;
using EPiServer.Framework.Blobs;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using EPiServer.Web.Routing;
using Foundation.SpaViewEngine.SpaContainer;
using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Routing;

namespace Foundation.SpaViewEngine
{
    public class SpaRouteHandler : IRouteHandler
    {
        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            return new SpaViewAssetHttpHandler();
        }
    }
}
