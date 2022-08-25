#nullable enable
using EPiServer.ServiceLocation;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.IO;
using System;

namespace HeadlessCms.Infrastructure.Certificates
{
    public class CertificateOptions
    {
        public bool UseDevelopmentCertificate { get; set; } = false;
        public string Directory { get; set; } = "certificates";
        public string SigningCertificate { get; set; } = "my.pfx";
        public string SigningCertificatePassPhrase { get; set; } = "Headless.Cms";
        public string EncryptionCertificate { get; set; } = "my.pfx";
        public string EncryptionCertificatePassPhrase { get; set; } = "Headless.Cms";
        public X509Certificate2? GetSigningCertificate(IWebHostEnvironment webhost) => GetCertificate(webhost, SigningCertificate, SigningCertificatePassPhrase);
        public X509Certificate2? GetEncryptionCertificate(IWebHostEnvironment webhost) => GetCertificate(webhost, EncryptionCertificate, EncryptionCertificatePassPhrase);
        private X509Certificate2? GetCertificate(IWebHostEnvironment webhost, string certFile, string passPhrase)
        {
            var certPath = Path.Combine(new string[] { "App_Data", Directory, certFile });
            var certFileInfo = webhost.ContentRootFileProvider.GetFileInfo(certPath);
            if (certFileInfo.Exists && !certFileInfo.IsDirectory) {
                try
                {
                    //new X509Store(StoreLocation)
                    var rawData = certFileInfo.AsByteArray();
                    return new X509Certificate2(rawData, passPhrase, X509KeyStorageFlags.EphemeralKeySet);
                }
                catch (Exception)
                {
                    return default;
                }
            }
            return default;
        }
    }
}
# nullable restore