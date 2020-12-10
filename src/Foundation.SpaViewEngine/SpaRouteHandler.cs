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
    public class SpaRouteHandler :IRouteHandler
    {

        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            return new SpaViewAssetHttpHandler();
        }
    }

    public class SpaViewAssetHttpHandler : BlobHttpHandler, IHttpAsyncHandler
    {
        IAsyncResult IHttpAsyncHandler.BeginProcessRequest(HttpContext context, AsyncCallback cb, object extraData)
        {
            if (context.Request.HttpMethod == "GET" || context.Request.HttpMethod == "HEAD")
                return ProcessRequestAsyncInternal(new HttpContextWrapper(context), cb, extraData);
            throw new HttpException(404, "Not Found.");
        }

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

    public class SpaViewBlob : Blob
    {
        public SpaMedia Container { get; protected set; }
        public string FilePath { get; protected set; }

        public SpaViewBlob(SpaMedia container, string path) : base(new Uri($"spa-asset://{ container.Name }/{ path }"))
        {
            Container = container;
            FilePath = path;
        }

        public override Stream OpenRead()
        {
            return SpaFolderHelper.GetItemFromDeploymentAsStream(Container, FilePath);
        }
        public override Stream OpenWrite()
        {
            throw new NotSupportedException("The SpaViewBlob is read-only");
        }

        public override void Write(Stream data)
        {
            throw new NotSupportedException("The SpaViewBlob is read-only");
        }

    }
}
