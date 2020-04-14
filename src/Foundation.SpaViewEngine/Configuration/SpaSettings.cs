using System.Linq;
using System.Web.Configuration;

namespace Foundation.SpaViewEngine.Configuration
{
    public class SpaSettings
    {
        protected const string Prefix = "foundation:spa:";

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
