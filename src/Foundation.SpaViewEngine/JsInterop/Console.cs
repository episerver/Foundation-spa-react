using EPiServer.Logging;
using EPiServer.ServiceLocation;

namespace Foundation.SpaViewEngine.JsInterop
{
    /// <summary>
    /// Host implementation of the JavaScript console, routing all console messages
    /// to the Episerver logger. It'll maintain the log level of the original message
    /// pushed to the JavaScript console.
    /// </summary>
    [ServiceConfiguration(ServiceType = typeof(Console), Lifecycle = ServiceInstanceScope.Singleton)]
    public class Console
    {
        private static readonly ILogger _logger = LogManager.GetLogger();

        //Disable the method naming convention message, as we're implementing a JavaScript API here.
#pragma warning disable IDE1006

        public void log(params object[] messages)
        {
            foreach (var message in messages) _logger.Debug(message == null ? "null" : message.ToString());
        }

        public void debug(params object[] messages)
        {
            foreach (var message in messages) _logger.Debug(message == null ? "null" : message.ToString());
        }
        public void info(params object[] messages)
        {
            foreach (var message in messages) _logger.Information(message == null ? "null" : message.ToString());
        }

        public void warn(params object[] messages)
        {
            foreach (var message in messages) _logger.Warning(message == null ? "null" : message.ToString());
        }

        public void error(params object[] messages)
        {
            foreach (var message in messages) _logger.Error(message == null ? "null" : message.ToString());
        }

        public void time(string id)
        {
            // Ignore
        }
        public void timeEnd(string id)
        {
            // Ignore
        }
#pragma warning restore IDE1006
    }
}
