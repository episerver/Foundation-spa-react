using EPiServer.Framework.Blobs;
using System;
using System.IO;

namespace Foundation.SpaViewEngine.SpaContainer
{
    public class SpaMediaAssetBlob : Blob
    {
        public new const string BlobUriScheme = "spamediaasset";

        public static Uri CreateUri(SpaMedia spaMedia, string assetFullName) => CreateUri(spaMedia.Name, assetFullName);
        public static Uri CreateUri(string spaMedia, string assetFullName) => new Uri($"{ BlobUriScheme }://{ spaMedia }/{ assetFullName }");

        public SpaMedia Container { get; protected set; }
        public string FilePath { get; protected set; }

        public SpaMediaAssetBlob(SpaMedia container, string path) : base(CreateUri(container, path))
        {
            Container = container;
            FilePath = path;
        }
        public SpaMediaAssetBlob(string container, string path) : base(CreateUri(container, path))
        {
            Container = SpaFolderHelper.GetDeploymentItem(container);
            FilePath = path;
        }

        public override Stream OpenRead()
        {
            return Container.GetAssetAsStream(FilePath);
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
