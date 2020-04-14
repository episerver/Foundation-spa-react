using JavaScriptEngineSwitcher.Core;
using System;

namespace Foundation.SpaViewEngine.JsInterop
{
    public class Require
    {
        public IJsEngine JsEngine { private set; get; }

        public Require(IJsEngine engine) => JsEngine = engine;

        public object DoRequire(string path)
        {
            switch (path)
            {
                case "stream":
                    return true;
                default:
                    throw new Exception("The module " + path + " has not been included in the build!");
            }
        }

        protected void EnableStreams()
        {

        }
    }
}
