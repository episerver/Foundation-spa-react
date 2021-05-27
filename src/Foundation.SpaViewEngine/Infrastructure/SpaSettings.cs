using System.Linq;
using System.Web.Configuration;

namespace Foundation.SpaViewEngine.Infrastructure
{
    public class SpaSettings
    {
        protected const string Prefix = "foundation:spa:";

        private string _browserContainerName = string.Empty;
        private string _serverContainerName = string.Empty;
        private string _htmlTemplateName = string.Empty;
        private string _serverJsName = string.Empty;

        public string BrowserContainerName
        {
            get => string.IsNullOrWhiteSpace(_browserContainerName) ? GetConfigValue("container:browser", "app.html.spa") : _browserContainerName;
            set => _browserContainerName = value;
        }

        public string ServerContainerName
        {
            get => string.IsNullOrWhiteSpace(_serverContainerName) ? GetConfigValue("container:server", "app.server.spa") : _serverContainerName;
            set => _serverContainerName = value;
        }

        public string HtmlTemplateName
        {
            get => string.IsNullOrWhiteSpace(_htmlTemplateName) ? GetConfigValue("server:template", "index.html") : _htmlTemplateName;
            set => _htmlTemplateName = value;
        }

        public string ServerJsName
        {
            get => string.IsNullOrWhiteSpace(_serverJsName) ? GetConfigValue("server:script", "server.js") : _serverJsName;
            set => _serverJsName = value;
        }

        public string GetConfigValue(string configKey) => GetConfigValue(configKey, null);

        public string GetConfigValue(string configKey, string defaultValue)
        {
            var fullConfigKey = BuildFullConfigKey(configKey);
            if (WebConfigurationManager.AppSettings.AllKeys.Contains(fullConfigKey))
            {
                return WebConfigurationManager.AppSettings[fullConfigKey];
            }
            return defaultValue;
        }

        protected string BuildFullConfigKey(string configKey) => Prefix + configKey;
    }
}
