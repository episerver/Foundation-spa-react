namespace Microsoft.AspNetCore.Http
{
    public static class RequestExtensions
    {
        public static Uri GetUri(this HttpRequest request)
        {
            UriBuilder uriBuilder = new UriBuilder();
            uriBuilder.Scheme = request.Scheme;
            uriBuilder.Host = request.Host.Host;
            if (request.Host.Port != null)
                uriBuilder.Port = (int)request.Host.Port;
            uriBuilder.Path = request.Path.ToString();
            uriBuilder.Query = request.QueryString.ToString();
            return uriBuilder.Uri;
        }

        public static string GetAbsoluteUrl(this HttpRequest request) { return request.GetUri().ToString(); }
    }
}
