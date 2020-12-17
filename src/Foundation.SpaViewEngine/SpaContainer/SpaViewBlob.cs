using EPiServer.Framework.Blobs;
using System;
using System.IO;

namespace Foundation.SpaViewEngine.SpaContainer
{
    public class SpaViewBlob : Blob
    {
        public new const string BlobUriScheme = "foundation.spaviewengine.asset";

        public SpaMedia Container { get; protected set; }
        public string FilePath { get; protected set; }

        public SpaViewBlob(SpaMedia container, string path) : base(new Uri($"{ BlobUriScheme }://{ container.Name }/{ path }"))
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
