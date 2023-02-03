using Microsoft.Extensions.Configuration;
using System;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;

namespace HeadlessCms.Extensions
{
    public static class IConfigurationExtensions
    {
        //public static string GetCertificateStoreName(this IConfiguration config) => config.GetCertificateStoreName("My");
        //public static string GetCertificateStoreName(this IConfiguration config, string defaultValue) => config.GetValueOrDefault(FoundationIConfigurationKeys.CertificateStoreName, defaultValue);
        //public static StoreLocation GetCertificateStoreLocation(this IConfiguration config) => config.GetCertificateStoreLocation(StoreLocation.LocalMachine);
        /*public static StoreLocation GetCertificateStoreLocation(this IConfiguration config, StoreLocation defaultValue)
        {
            string locationName = config.GetValueOrDefault(FoundationIConfigurationKeys.CertificateStoreLocation, string.Empty);
            if (string.Equals(locationName, "LocalMachine", StringComparison.InvariantCultureIgnoreCase))
                return StoreLocation.LocalMachine;
            if (string.Equals(locationName, "CurrentUser", StringComparison.InvariantCultureIgnoreCase))
                return StoreLocation.CurrentUser;
            if (string.IsNullOrEmpty(locationName))
                return defaultValue;
            throw new ApplicationException("Invalid OIDC Configuration, the certificate store location");
        }*/

        /*public static X509Certificate2 GetSigningCertificate(this IConfiguration config)
        {
            string thumbprint = config.GetValue<string>(FoundationIConfigurationKeys.SigningCertificate);
            if (string.IsNullOrWhiteSpace(thumbprint))
                return default;

            var cert = config.GetCertificate(thumbprint);
            Console.WriteLine("OIDC Signing Certificate: " + cert.ToString());
            return cert;
        }

        public static X509Certificate2 GetEncryptionCertificate(this IConfiguration config)
        {
            string thumbprint = config.GetValue<string>(FoundationIConfigurationKeys.EncryptionCertificate);
            if (string.IsNullOrWhiteSpace(thumbprint))
                return default;

            var cert = config.GetCertificate(thumbprint);
            Console.WriteLine("OIDC Encryption Certificate: " + cert.ToString());
            return cert;
        }*/

        /*private static TOut GetValueOrDefault<TOut>(this IConfiguration config, string path, TOut defaultValue)
        {
            try {
                var setting = config.GetValue<TOut>(path);
                if (setting != null)
                    return setting;
            } catch {
                // Ignore on purpose
            }
            return defaultValue;
        }*/

        /*private static X509Certificate2 GetCertificate(this IConfiguration config, string thumbprint)
        {
            X509Certificate2 cert = default;
            using (var store = new X509Store(config.GetCertificateStoreName(),config.GetCertificateStoreLocation()))
            {
                try {
                    store.Open(OpenFlags.OpenExistingOnly);
                    var certs = store.Certificates
                            .Find(X509FindType.FindByTimeValid, DateTime.Now, false)
                            .Find(X509FindType.FindByThumbprint, thumbprint, false);

                    if (certs.Count == 1)
                        cert = certs[0];
                }
                catch (CryptographicException) 
                {
                    // @ToDo: Add loggging
                }
            }
            return cert;
        }*/
    }

    /*public static class FoundationIConfigurationKeys
    {
        public const string CertificateStoreName = "Foundation:Certificates:StoreName";
        public const string CertificateStoreLocation = "Foundation:Certificates:StoreLocation";
        public const string EncryptionCertificate = "Foundation:Certificates:EncryptionThumbprint";
        public const string SigningCertificate = "Foundation:Certificates:SigningThumbprint";
    }*/
}