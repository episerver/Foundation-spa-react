using EPiServer;
using EPiServer.ServiceLocation;
using EPiServer.Web.Routing;
using Foundation.SpaViewEngine.SpaContainer;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Routing;

namespace Foundation.SpaViewEngine
{
    public class SpaRouteHandler :IRouteHandler
    {
        private IUrlResolver _urlResolver;
        private string _pathRoot;

        public SpaRouteHandler(string pathRoot) 
            : this(
                  pathRoot,
                  ServiceLocator.Current.GetInstance<IUrlResolver>()
                  ) 
        { }

        public SpaRouteHandler(string pathRoot, IUrlResolver urlResolver)
        {
            _pathRoot = pathRoot;
            _urlResolver = urlResolver;
        }

        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            var reqPath = requestContext.HttpContext.Request.Url.PathAndQuery;

            if (reqPath.StartsWith($"/{_pathRoot}/"))
            {
                var spaFile = SpaFolderHelper.GetDeploymentItems().Where(x => x.Name == _pathRoot).DefaultIfEmpty(null).FirstOrDefault();
                if (spaFile == null) return new DefaultHttpHandler();

                var internalUrl = _urlResolver.GetUrl(spaFile.ContentLink);
                var url = new UrlBuilder(internalUrl);

                Global.UrlRewriteProvider.ConvertToExternal(url, spaFile.ContentLink, Encoding.UTF8);

                var newPath = reqPath.Replace($"/{_pathRoot}/", $"{url.Path}/");

                // requestContext.HttpContext.Server.Transfer(newPath, true);
                requestContext.HttpContext.Response.Redirect(newPath, true);
            }

            return new DefaultHttpHandler();
        }
    }
}
