using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using System;
using System.IO;

#nullable enable

namespace HeadlessCms.Infrastructure.Certificates
{
    public static class Extensions
    {
        public static CertificateOptions GetCertificateOptions(this IConfiguration configuration) {
            var config =  configuration.GetValue<CertificateOptions>("Foundation:Certificates");
            if (config is null) config = new CertificateOptions();
            return config;
        }

        public static byte[] AsByteArray(this IFileInfo fileInfo)
        {
            using var stream = fileInfo.CreateReadStream();
            using var memory = new MemoryStream();
            stream.CopyTo(memory);
            return memory.ToArray();
        }
    }
}

#nullable restore