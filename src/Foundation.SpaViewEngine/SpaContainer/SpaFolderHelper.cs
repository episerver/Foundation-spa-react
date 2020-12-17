using EPiServer;
using EPiServer.Core;
using EPiServer.Framework.Blobs;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;
using Schema.NET;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.SpaViewEngine.SpaContainer
{
    public static class SpaFolderHelper
    {
        //private static readonly Lazy<IContentRepository> _contentRepository = new Lazy<IContentRepository>(() => ServiceLocator.Current.GetInstance<IContentRepository>());
        private static Injected<IContentRepository> _contentRepository;
        private static Injected<IContentLoader> _contentLoader;

        public static ContentReference GetOrCreateDeploymentFolder()
        {
            var epiRoot = ContentReference.RootPage;
            ContentReference spaFolder;

            var spaFolders = _contentLoader.Service.GetChildren<SpaFolder>(epiRoot);
            if (!spaFolders.Any())
            {
                var spaFolderContent = _contentRepository.Service.GetDefault<SpaFolder>(epiRoot);
                spaFolderContent.Name = "SpaContainer";
                return _contentRepository.Service.Save(spaFolderContent, EPiServer.DataAccess.SaveAction.Publish, EPiServer.Security.AccessLevel.NoAccess);
            }
            else
            {
                spaFolder = spaFolders.SingleOrDefault().ContentLink;
            }

            return spaFolder;
        }

        public static IEnumerable<SpaMedia> GetDeploymentItems()
        {
            var folderReference = GetOrCreateDeploymentFolder();
            return _contentLoader.Service.GetChildren<SpaMedia>(folderReference);
        }

        public static SpaMedia GetDeploymentItem(string name)
        {
            var items = GetDeploymentItems();
            return items.Where(x => x.Name == name).DefaultIfEmpty(null).FirstOrDefault();
        }

        public static string GetItemFromDeploymentAsString(string fileName, string filePath)
        {
            var item = GetDeploymentItem(fileName);
            var document = GetDocumentFromContentMedia(item, filePath);

            if (document == null) return null;
            using (var stream = document.Open())
            {
                using (var reader = new StreamReader(stream))
                {
                    return reader.ReadToEnd();
                }
            }
        }

        public static byte[] GetItemFromDeploymentAsBytes(SpaMedia content, string filePath)
        {
            var document = GetDocumentFromContentMedia(content, filePath);
            byte[] fileBytes = null;

            using (var stream = document?.Open())
            {
                
                using (var memStream = new MemoryStream())
                {
                    byte[] buffer = new byte[8 * 1024];
                    int read;
                    while ((read = stream.Read(buffer, 0, buffer.Length)) > 0)
                    {
                        memStream.Write(buffer, 0, read);
                    }

                    fileBytes = memStream.ToArray();
                }
            }

            return fileBytes;
        }

        public static bool HasItemInDeployment(SpaMedia content, string filePath)
        {
            return GetDocumentFromContentMedia(content, filePath) != null;
        }

        public static Stream GetItemFromDeploymentAsStream(SpaMedia content, string filePath)
        {
            var document = GetDocumentFromContentMedia(content, filePath);
            return document?.Open();
        }

        public static ReadOnlyCollection<ZipArchiveEntry> GetAssetsFromContentMedia(SpaMedia content)
        {
            var blob = content?.BinaryData;
            if (blob == null) return null;

            var source = new ZipArchive(blob.OpenRead(), ZipArchiveMode.Read);
            return source.Entries;
        }

        private static ZipArchiveEntry GetDocumentFromContentMedia(SpaMedia content, string filePath)
        {
            if (content == null) return null;

            var blob = content.BinaryData;
            if (blob == null) return null;

            var source = new ZipArchive(blob.OpenRead(), ZipArchiveMode.Read);
            var document = source.GetEntry(filePath);
            return document;
        }
    }
}
