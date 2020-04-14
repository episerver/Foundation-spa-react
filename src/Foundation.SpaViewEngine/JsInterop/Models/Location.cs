using System;
using System.Web;

namespace Foundation.SpaViewEngine.JsInterop.Models
{
    public class Location : JavaScriptObject
    {
        protected Uri CurrentUri => HttpContext.Current.Request.Url;

        //Disable the method naming convention message, as we're implementing a JavaScript API here.
#pragma warning disable IDE1006
        public string href => CurrentUri.AbsoluteUri;

        public string hostname => CurrentUri.Host;

        public string pathname => CurrentUri.AbsolutePath;

        public string protocol => CurrentUri.Scheme;
#pragma warning restore IDE1006

        /*
        window.location.href returns the href(URL) of the current page
        window.location.hostname returns the domain name of the web host
        window.location.pathname returns the path and filename of the current page
        window.location.protocol returns the web protocol used (http: or https:)
        */
    }
}
