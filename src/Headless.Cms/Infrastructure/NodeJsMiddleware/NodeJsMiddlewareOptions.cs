using EPiServer.ServiceLocation;
using System;

namespace HeadlessCms.Infrastructure.NodeJsMiddleware
{
    [Options(ConfigurationSection = "NodeJsMiddleware")]
    public class NodeJsMiddlewareOptions
    {
        public static readonly string Section = "NodeJsMiddleware";

        public bool UseHttps { get; set; } = false;

        public int Port { get; set; } = 3080;

        public int ProxyTimeout { get; set; } = 10;

        public string Host { get; set; } = "localhost";

        public string FrontendPath { get; set; } = "./frontend";

        /// <summary>
        /// The script name that will be invoked to start the frontend
        /// </summary>
        public string ScriptName { get; set; } = "dotnet.js";

        /// <summary>
        /// When set to true, the Node.JS process will automatically be restarted
        /// when the operating system indicates that the process has ended.
        /// </summary>
        public bool AutoRestart { get; set; } = true;

        /// <summary>
        /// When set to true, the Node.JS process will automatically be start
        /// when the middleware starts. If set to false, you MUST start/stop/restart
        /// the process yourself manually.
        /// </summary>
        public bool AutoStart { get; set; } = true;

        /// <summary>
        /// Master switch to disable the middleware, eventhough it is installed and
        /// configured in the application
        /// </summary>
        public bool Disabled { get; set; } = false;

        /// <summary>
        /// Number of minutes the "whenReady" method will wait for the Node.JS 
        /// process to start responding to HTTP Requests
        /// </summary>
        public int StartupTimeout { get; set; } = 1;

        /// <summary>
        /// Helper property to get the destination Uri as configured by the other
        /// fields in this class. When set in the configuration, the Uri will be
        /// parsed and stored in the properties of this class.
        /// </summary>
        public string DestinationServer { 
            get {
                return (UseHttps ? "https" : "http") + "://" + Host + ":" + Port.ToString() + "/";
            } 
            set
            {
                var url = new Uri(value);
                UseHttps = url.Scheme == "https";
                Host = url.Host;
                Port = url.Port;
            }
        }
    }
}
