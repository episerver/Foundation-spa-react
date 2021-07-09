
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

        public static SSRResponse Create(dynamic response)
        {
            var ssrresponse = new SSRResponse
            {
                Body = response.Body,
                HtmlAttributes = response.HtmlAttributes,
                Title = response.Title,
                Meta = response.Meta,
                Link = response.Link,
                Script = response.Script,
                Style = response.Style,
                BodyAttributes = response.BodyAttributes,
                StatusCode = int.TryParse(response.StatusCode.ToString(), out int statusCode) ? statusCode : 200
            };
            return ssrresponse;
        }

        public static bool TryCreate(dynamic response, out SSRResponse ssrresponse)
        {
            try
            {
                ssrresponse = Create(response);
                return true;
            }
            catch {
                ssrresponse = null;
                return false;
            }
        }
    }
}
