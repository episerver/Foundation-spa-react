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
            var section =  configuration.GetSection("Foundation:Certificates");
            return section is null ? new CertificateOptions() : CertificateOptions.CreateFromSection(section);
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