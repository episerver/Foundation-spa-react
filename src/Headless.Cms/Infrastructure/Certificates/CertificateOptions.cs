#nullable enable
using EPiServer.ServiceLocation;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.IO;
using System;
using Microsoft.Extensions.Configuration;

namespace HeadlessCms.Infrastructure.Certificates
{
    [Options(ConfigurationSection = "Foundation:Certificates")]
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
                catch (Exception e)
                {
                    Console.WriteLine($"[ERROR] Cannot open the certificate {certFile} due to {e.Message}");
                    return default;
                }
            }
            Console.WriteLine($"[ERROR] Could not locate the certificate {certFile}");
            return default;
        }

        public static CertificateOptions CreateFromSection(IConfigurationSection section)
        {
            var opts = new CertificateOptions() {
                UseDevelopmentCertificate = section.GetValue<bool?>("UseDevelopmentCertificate") ?? false,
                Directory = section.GetValue<string?>("Directory") ?? "certificates",
                SigningCertificate = section.GetValue<string?>("SigningCertificate") ?? "my.pfx",
                SigningCertificatePassPhrase = section.GetValue<string?>("SigningCertificatePassPhrase") ?? "Headless.Cms",
                EncryptionCertificate = section.GetValue<string?>("EncryptionCertificate") ?? "my.pfx",
                EncryptionCertificatePassPhrase = section.GetValue<string?>("EncryptionCertificatePassPhrase") ?? "Headless.Cms"
            };
            return opts;
        }
    }
}
# nullable restore