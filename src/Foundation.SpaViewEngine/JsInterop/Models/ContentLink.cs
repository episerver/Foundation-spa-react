using System;

namespace Foundation.SpaViewEngine.JsInterop.Models
{
    public class ContentLink
    {
        //Disable the method naming convention message, as we're implementing a JavaScript API here.
#pragma warning disable IDE1006
        public int id { get; set; }
        public int workId { get; set; }
        public Guid? guidValue { get; set; }
        public string providerName { get; set; }
        public string url { get; set; }
#pragma warning restore IDE1006
    }
}
