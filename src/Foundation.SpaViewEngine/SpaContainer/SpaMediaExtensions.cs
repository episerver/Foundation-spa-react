using EPiServer.Core;
using EPiServer.Framework.Cache;
using EPiServer.ServiceLocation;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.SpaViewEngine.SpaContainer
{
    public static class SpaMediaExtensions
    {
        private static Injected<IContentCacheKeyCreator> _cacheKeyCreator;
        private static Injected<ISynchronizedObjectInstanceCache> _cache;

        public static byte[] GetAssetAsBytes(this SpaMedia spaMedia, string assetFullName)
        {
            byte[] fileBytes = null;
            using (var stream = spaMedia.GetAssetAsStream(assetFullName))
            {
                if (stream == null) return null;
                using (var memStream = new MemoryStream())
                {
                    byte[] buffer = new byte[8 * 1024];
                    int read;
                    while ((read = stream.Read(buffer, 0, buffer.Length)) > 0)
                        memStream.Write(buffer, 0, read);

                    fileBytes = memStream.ToArray();
                }
            }

            return fileBytes;
        }

        public static SpaMediaAssetBlob GetAssetAsBlob(this SpaMedia spaMedia, string assetFullName)
        {
            if (!spaMedia.HasAsset(assetFullName))
                throw new FileNotFoundException(SpaMediaAssetBlob.CreateUri(spaMedia, assetFullName).AbsoluteUri);

            return new SpaMediaAssetBlob(spaMedia, assetFullName);
        }

        public static string GetAssetAsString(this SpaMedia spaMedia, string assetFullName) => spaMedia.GetAssetAsString(assetFullName, false);

        public static string GetAssetAsString(this SpaMedia spaMedia, string assetFullName, bool useCache)
        {
            var cacheKey = _cacheKeyCreator.Service.CreateVersionCacheKey(spaMedia.ContentLink) + ":" + assetFullName;

            string assetContents = null;
            if (useCache && _cache.Service.TryGet(cacheKey, ReadStrategy.Immediate, out assetContents))
                return assetContents;
            using (var stream = spaMedia.GetAssetAsStream(assetFullName))
            {
                if (stream == null) return null;
                using (var reader = new StreamReader(stream)) 
                    assetContents = reader.ReadToEnd();
            }
            if (useCache)
            {
                var commonKey = _cacheKeyCreator.Service.CreateVersionCommonCacheKey(spaMedia.ContentLink);
                var policy = new CacheEvictionPolicy(
                    expiration: TimeSpan.FromDays(1),
                    timeoutType: CacheTimeoutType.Sliding,
                    cacheKeys: new string[0],
                    masterKeys: new string[] { commonKey }
                );
                _cache.Service.Insert(cacheKey, assetContents, policy);
            }
            return assetContents;
        }

        public static Stream GetAssetAsStream(this SpaMedia spaMedia, string assetFullName)
        {
            return spaMedia.GetAsset(assetFullName)?.Open();
        }

        public static ZipArchiveEntry GetAsset(this SpaMedia spaMedia, string assetFullName)
        {
            return spaMedia.GetAssets().Where(x => x.FullName == assetFullName).DefaultIfEmpty(null).FirstOrDefault();
        }

        public static bool HasAsset(this SpaMedia spaMedia, string assetFullName)
        {
            return spaMedia.GetAssets().Any(x => x.FullName == assetFullName);
        }

        public static ZipArchive GetArchive(this SpaMedia spaMedia)
        {
            var blob = spaMedia?.BinaryData;
            return blob != null ? new ZipArchive(blob.OpenRead(), ZipArchiveMode.Read) : null;
        }

        public static ReadOnlyCollection<ZipArchiveEntry> GetAssets(this SpaMedia spaMedia)
        {
            return spaMedia.GetArchive()?.Entries ?? new ReadOnlyCollection<ZipArchiveEntry>(new ZipArchiveEntry[0]);
        }
    }
}
