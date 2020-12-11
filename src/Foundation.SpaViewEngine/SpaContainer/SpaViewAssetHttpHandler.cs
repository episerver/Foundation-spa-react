using EPiServer.Framework.Blobs;
using EPiServer.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Foundation.SpaViewEngine.SpaContainer
{
    public class SpaViewAssetHttpHandler : BlobHttpHandler, IHttpAsyncHandler
    {
        protected override Blob GetBlob(HttpContextBase httpContext)
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
