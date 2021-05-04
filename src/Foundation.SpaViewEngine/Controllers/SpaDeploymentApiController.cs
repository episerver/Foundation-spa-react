using EPiServer;
using EPiServer.ContentApi.Core.Security.Internal;
using EPiServer.Core;
using EPiServer.Framework.Blobs;
using EPiServer.Security;
using Foundation.SpaViewEngine.Security;
using Foundation.SpaViewEngine.SpaContainer;
using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Foundation.SpaViewEngine.Controllers
{
    [RoutePrefix("api/episerver/v3/deploy")]
    [ContentApiAuthorization]
    [ContentApiCors]
    [CorsOptionsActionFilter]
    public class SpaDeploymentApiController : ApiController
    {
        private readonly IContentRepository _contentRepository;
        private readonly IBlobFactory _blobFactory;

        public SpaDeploymentApiController(IContentRepository contentRepository, IBlobFactory blobFactory)
        {
            _blobFactory = blobFactory;
            _contentRepository = contentRepository;
        }

        [Route("")]
        [HttpGet]
        public IHttpActionResult Index()
        {
            if (!PrincipalInfo.Current.IsPermitted(SpaViewEnginePermissions.DeploySpa)) return NotFound();
            return Ok("This endpoint is working.");
        }

        [Route("")]
        [HttpPost]
        public async Task<IHttpActionResult> DeployFiles()
        {
            if (!PrincipalInfo.Current.IsPermitted(SpaViewEnginePermissions.DeploySpa) || !PrincipalInfo.HasAdminAccess) return NotFound();
            HttpRequestMessage request = this.Request;
            if (!request.Content.IsMimeMultipartContent())
            {
                return BadRequest("No file attached.");
            }

            var provider = new MultipartMemoryStreamProvider();
            var uploadContent = await request.Content.ReadAsMultipartAsync(provider);

            if (provider.Contents.Any(x => !(x.Headers.ContentDisposition.FileName.Trim('"').EndsWith(".spa", StringComparison.OrdinalIgnoreCase))))
            {
                return BadRequest("Only files of type *.spa are allowed.");
            }

            foreach (var file in provider.Contents)
            {
                var filename = file.Headers.ContentDisposition.FileName.Trim('"').ToLower();
                if (filename.EndsWith(".spa", StringComparison.OrdinalIgnoreCase))
                {
                    var data = await file.ReadAsByteArrayAsync();
                    var reference = AddFileContent(filename, data);
                }
            }
            
            return Ok();
        }

        private ContentReference AddFileContent(string fileName, byte[] data)
        {
            ContentReference storageReference = SpaFolderHelper.GetOrCreateDeploymentFolder();

            var existingFile = _contentRepository.GetChildren<SpaMedia>(storageReference).Where(c => c.Name == fileName).DefaultIfEmpty(null).FirstOrDefault();
            SpaMedia spaFileContent;

            if (existingFile == null)
                spaFileContent = _contentRepository.GetDefault<SpaMedia>(storageReference);
            else
                spaFileContent = (SpaMedia)existingFile.CreateWritableClone();

            spaFileContent.Name = fileName;
            //spaFileContent.ExternalURL = fileName;

            spaFileContent.SetChangedOnPublish = true;
            var container = spaFileContent.BinaryDataContainer;
            spaFileContent.BinaryData = _blobFactory.CreateBlob(container, ".spa");
            spaFileContent.BinaryData.WriteAllBytes(data);
            return _contentRepository.Save(spaFileContent, EPiServer.DataAccess.SaveAction.Publish, AccessLevel.Create | AccessLevel.Edit | AccessLevel.Publish);
        }
    }
}
