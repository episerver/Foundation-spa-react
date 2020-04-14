using EPiServer.Logging;

namespace Foundation.SpaViewEngine.JsInterop
{
    /// <summary>
    /// Host implementation of the JavaScript console, routing all console messages
    /// to the Episerver logger. It'll maintain the log level of the original message
    /// pushed to the JavaScript console.
    /// </summary>
    public class Console
    {
        private static readonly ILogger _logger = LogManager.GetLogger();

        //Disable the method naming convention message, as we're implementing a JavaScript API here.
#pragma warning disable IDE1006

        public void log(params object[] messages)
        {
            foreach (var message in messages) _logger.Debug(message.ToString());
        }

        public void debug(params object[] messages)
        {
            foreach (var message in messages) _logger.Debug(message.ToString());
        }
        public void info(params object[] messages)
        {
            foreach (var message in messages) _logger.Information(message.ToString());
        }

        public void warn(params object[] messages)
        {
            foreach (var message in messages) _logger.Warning(message.ToString());
        }

        public void error(params object[] messages)
        {
            foreach (var message in messages) _logger.Error(message.ToString());
        }
#pragma warning restore IDE1006
    }
}
