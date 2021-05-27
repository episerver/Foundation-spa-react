using EPiServer;
using EPiServer.Core;
using EPiServer.ServiceLocation;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.IO.Compression;
using System.Linq;

namespace Foundation.SpaViewEngine.SpaContainer
{
    public static class SpaFolderHelper
    {
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

        public static SpaMedia GetDeploymentItem(string fileName)
        {
            var items = GetDeploymentItems();
            return items.Where(x => x.Name == fileName).DefaultIfEmpty(null).FirstOrDefault();
        }

        public static string GetItemFromDeploymentAsString(SpaMedia file, string filePath)
        {
            var document = GetDocumentFromContentMedia(file, filePath);

            if (document == null) return null;
            using (var stream = document.Open())
            {
                using (var reader = new StreamReader(stream))
                {
                    return reader.ReadToEnd();
                }
            }
        }
        public static string GetItemFromDeploymentAsString(string fileName, string filePath) => GetItemFromDeploymentAsString(GetDeploymentItem(fileName), filePath);

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
            var entries = GetAssetsFromContentMedia(content);
            if (entries == null) return null;
            return entries.Where(e => e.FullName.Equals(filePath)).FirstOrDefault();
        }

        public static bool HasItemInDeployment(SpaMedia content, string filePath) => GetAssetsFromContentMedia(content).Any(file => file.FullName.Equals(filePath));

        public static bool HasItemInDeployment(string content, string filePath) => HasItemInDeployment(GetDeploymentItem(content), filePath);
    }
}
