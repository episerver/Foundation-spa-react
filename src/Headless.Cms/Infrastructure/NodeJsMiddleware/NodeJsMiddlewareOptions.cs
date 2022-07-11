using EPiServer.ServiceLocation;

namespace HeadlessCms.Infrastructure.NodeJsMiddleware
{
    [Options(ConfigurationSection = "NodeJsMiddleware")]
    public class NodeJsMiddlewareOptions
    {
        public static readonly string Section = "NodeJsMiddleware";

        public bool UseHttps { get; set; } = false;

        public int Port { get; set; } = 3000;

        public string Host { get; set; } = "localhost";

        public string FrontendPath { get; set; } = "./frontend";

        public string ScriptName { get; set; } = "dotnet.js";

        public bool AutoRestart { get; set; } = true;

        public bool Disabled { get; set; } = false;
    }
}
