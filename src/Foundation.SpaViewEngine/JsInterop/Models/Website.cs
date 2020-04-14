using System;
using System.Collections.Generic;

namespace Foundation.SpaViewEngine.JsInterop.Models
{
    public class Website
    {
        //Disable the method naming convention message, as we're implementing a JavaScript API here.
#pragma warning disable IDE1006
        public Guid id { get; set; }
        public string name { get; set; }
        public IEnumerable<Language> languages { get; set; }
        public Dictionary<string, ContentLink> contentRoots { get; set; }
#pragma warning restore IDE1006
    }
}
