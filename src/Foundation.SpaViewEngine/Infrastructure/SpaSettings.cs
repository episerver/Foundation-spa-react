using EPiServer.ServiceLocation;
using System.Linq;
using System.Web.Configuration;

namespace Foundation.SpaViewEngine.Infrastructure
{
    [Options]
    public class SpaSettings
    {
        protected const string Prefix = "foundation:spa:";

        private string _browserContainerName = string.Empty;
        private string _serverContainerName = string.Empty;
        private string _htmlTemplateName = string.Empty;
        private string _serverJsName = string.Empty;

        public virtual string BrowserContainerName
        {
            get => string.IsNullOrWhiteSpace(_browserContainerName) ? GetConfigValue("container:browser", "app.html.spa") : _browserContainerName;
            set => _browserContainerName = value;
        }

        public virtual string ServerContainerName
        {
            get => string.IsNullOrWhiteSpace(_serverContainerName) ? GetConfigValue("container:server", "app.server.spa") : _serverContainerName;
            set => _serverContainerName = value;
        }

        public virtual string HtmlTemplateName
        {
            get => string.IsNullOrWhiteSpace(_htmlTemplateName) ? GetConfigValue("server:template", "index.html") : _htmlTemplateName;
            set => _htmlTemplateName = value;
        }

        public virtual string ServerJsName
        {
            get => string.IsNullOrWhiteSpace(_serverJsName) ? GetConfigValue("server:script", "server.js") : _serverJsName;
            set => _serverJsName = value;
        }

        protected virtual string GetConfigValue(string configKey) => GetConfigValue(configKey, null);

        protected virtual string GetConfigValue(string configKey, string defaultValue)
        {
            var fullConfigKey = BuildFullConfigKey(configKey);
            if (WebConfigurationManager.AppSettings.AllKeys.Contains(fullConfigKey))
            {
                return WebConfigurationManager.AppSettings[fullConfigKey];
            }
            return defaultValue;
        }

        protected virtual string BuildFullConfigKey(string configKey) => Prefix + configKey;
    }
}
