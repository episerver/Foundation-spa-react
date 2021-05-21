
using System.Collections.Generic;

namespace Foundation.SpaViewEngine.JsInterop.Models
{
    public class SSRResponse
    {
        public string Body { get; set; } = "";
        public string HtmlAttributes { get; set; } = "";
        public string Title { get; set; } = "";
        public string Meta { get; set; } = "";
        public string Link { get; set; } = "";
        public string Script { get; set; } = "";
        public string Style { get; set; } = "";
        public string BodyAttributes { get; set; } = "";
        public int StatusCode { get; set; } = 200;
        public Dictionary<string, string> Headers { get; set; } = new Dictionary<string, string>();
    }
}
