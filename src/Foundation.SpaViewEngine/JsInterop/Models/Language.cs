namespace Foundation.SpaViewEngine.JsInterop.Models
{
    public class Language
    {
        //Disable the method naming convention message, as we're implementing a JavaScript API here.
#pragma warning disable IDE1006
        public virtual string name { get; set; }
        public virtual string displayName { get; set; }
        public virtual bool isMasterLanguage { get; set; }
        public virtual string link { get; set; }
#pragma warning restore IDE1006
    }
}
