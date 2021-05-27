using EPiServer;
using EPiServer.Editor;
using EPiServer.ServiceLocation;
using EPiServer.Web.Routing;
using EPiServer.Web.Routing.Segments;
using Foundation.SpaViewEngine.SpaContainer;
using System.Linq;
using System.Web;
using System.Web.Routing;

namespace Foundation.SpaViewEngine
{
    public class SpaPartialRouter : IPartialRouter<SpaMedia, SpaFileModel>
    {
        private IContentRepository _contentRepository;

        public SpaPartialRouter() : this(ServiceLocator.Current.GetInstance<IContentRepository>()) { }

        public SpaPartialRouter(IContentRepository contentRepository)
        {
            _contentRepository = contentRepository;
        }

        public PartialRouteData GetPartialVirtualPath(SpaFileModel content, string language, RouteValueDictionary routeValues, RequestContext requestContext)
        {
            if (PageEditing.PageIsInEditMode) return null;

            return new PartialRouteData
            {
                BasePathRoot = SpaFolderHelper.GetOrCreateDeploymentFolder()
            };
        }

        public object RoutePartial(SpaMedia content, SegmentContext segmentContext)
        {
            var pathOmitQS = segmentContext.RemainingPath.Split('?').First();
            segmentContext.RemainingPath = string.Empty;

            var model = new SpaFileModel
            {
                FileBytes = SpaFolderHelper.GetItemFromDeploymentAsBytes(content, pathOmitQS),
                FileType = GetFileMimeTypeFromPath(pathOmitQS)
            };

            return model;
        }

        private string GetFileMimeTypeFromPath(string path)
        {
            var fileType = string.Empty;
            if (path.Contains("."))
            {
                var fileName = path.Split('/').Last();
                fileType = MimeMapping.GetMimeMapping(fileName);
            }

            return fileType;
        }
    }
}
