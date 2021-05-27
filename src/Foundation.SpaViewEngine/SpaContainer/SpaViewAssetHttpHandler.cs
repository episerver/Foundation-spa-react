using EPiServer.Framework.Blobs;
using EPiServer.Web;
using EPiServer.Web.Routing;
using System.Linq;
using System.Web;
using System.Web.Routing;

namespace Foundation.SpaViewEngine.SpaContainer
{
    public class SpaViewAssetHttpHandler : BlobHttpHandler, IHttpAsyncHandler
    {
        protected override Blob GetBlob(HttpContextBase httpContext)
        {
            if (GetBlobFromRouteData(httpContext) is Blob assetBlob) return assetBlob;
            return GetBlobFromContext(httpContext);
        }

        protected virtual Blob GetBlobFromRouteData(HttpContextBase httpContext)
        {
            if (!(httpContext.Items.Contains(RoutingConstants.HandledRouteDataKey) && httpContext.Items[RoutingConstants.HandledRouteDataKey] is RouteData routeData)) return null;
            if (!(routeData.Values.ContainsKey("container") && routeData.Values["container"] is string container)) return null;
            if (!(routeData.Values.ContainsKey("path") && routeData.Values["path"] is string itemPath)) return null;
            if (!(SpaFolderHelper.GetDeploymentItem(container) is SpaMedia spaMedia)) return null;
            return SpaFolderHelper.HasItemInDeployment(spaMedia, itemPath) ? new SpaViewBlob(spaMedia, itemPath) : null;
        }

        protected virtual Blob GetBlobFromContext(HttpContextBase httpContext)
        {
            var path = httpContext.Request.Url.AbsolutePath;
            var pathParts = path.TrimStart('/').Split('/').DefaultIfEmpty("");
            if (pathParts.FirstOrDefault() != "spaview") return null;
            pathParts = pathParts.Skip(1);
            if (pathParts.Count() > 1 && pathParts.Last() != "")
            {
                var spaFile = SpaFolderHelper.GetDeploymentItem(pathParts.First());
                if (spaFile == null) return null;

                var itemPath = string.Join("/", pathParts.Skip(1));
                return SpaFolderHelper.HasItemInDeployment(spaFile, itemPath) ? new SpaViewBlob(spaFile, itemPath) : null;
            }
            return null;
        }
    }
}
