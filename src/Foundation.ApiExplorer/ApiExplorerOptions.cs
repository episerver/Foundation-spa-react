using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;

namespace Foundation.ApiExplorer
{
    /// <summary>
    /// Main configuration object for the API Explorer
    /// </summary>
    public class ApiExplorerOptions
    {
        private string? _documentName = null;
        /// <summary>
        /// Set the application name as used within the API Explorer
        /// </summary>
        public string ApplicationName { get; set; } = "Optimizely CMS 12";

        /// <summary>
        /// The version of the API definition, as exposed within the API definition as well
        /// as within the API Explorer
        /// </summary>
        public string ApplicationVersion { get; set; } = "v3.0";

        /// <summary>
        /// The OAuth Client ID used when authenticating with an OAuth based IDP
        /// </summary>
        public string OAuthClientId { get; set; } = "ApiExplorer";

        /// <summary>
        /// The OAuth Client Secret used when authenticating with an OAuth based IDP, leave
        /// this value empty for production mode as it can cause a leak of cryptographic tokens.
        /// </summary>
        public string OAuthClientSecret { get; set; } = string.Empty;
        public IList<string> DefaultAuthScopes { get; set; } = new List<string>() { "openid", "offline_access", "profile", "email" };
        public IList<string> GlobalAuthScopes { get; set; } = new List<string>() { "openid" };
        public bool EnableFilter { get; set; } = false;
        public Uri? MasterUrl { get; set; } // = new Uri("http://localhost:8000");
        public string DocumentName
        {
            get
            {
                return _documentName ?? ApplicationVersion;
            }
            set
            {
                _documentName = value;
            }
        }
        public OpenApiInfo CreateApiInfo()
        {
            var info = new OpenApiInfo { Title = $"{ ApplicationName } - { ApplicationVersion }", Version = ApplicationVersion };
            ConfigureInfo?.Invoke(info);
            return info;
        }
        public Action<OpenApiSecurityScheme>? ConfigureSecurity { get; set; } = null;
        public Action<OpenApiInfo>? ConfigureInfo { get; set; } = null;
        public static ApiExplorerOptions CreateFromSiteURL(string siteUrl) => new() { MasterUrl = new Uri(siteUrl) };
        public static ApiExplorerOptions CreateFromSiteURL(Uri siteUrl) => new() { MasterUrl = siteUrl };
    }
}
