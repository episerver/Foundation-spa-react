using Microsoft.AspNetCore.Http;
using UNRVLD.ODP;
using UNRVLD.ODP.VisitorGroups;

#nullable enable
namespace HeadlessCms.Infrastructure
{
    public class ODPUserProfile : IODPUserProfile
    {
        private readonly OdpVisitorGroupOptions _optionValues;

        protected virtual string OdpHeaderName => "x-" + _optionValues.OdpCookieName;
        protected virtual string OdpQueryParam => _optionValues.OdpCookieName;
        protected virtual string OdpCookieName => _optionValues.OdpCookieName;

        public ODPUserProfile(OdpVisitorGroupOptions optionValues)
        {
            _optionValues = optionValues;
        }

        public string? GetDeviceId(HttpContext? httpContext)
        {
            return VuidToDeviceId(GetVuidFromContext(httpContext));
        }

        protected virtual string? GetVuidFromContext(HttpContext? httpContext)
        {
            // Only continue if we have an HTTP Context
            if (httpContext is null)
                return null;

            // Prefer Cookie based user identification
            var cookie = httpContext.Request.Cookies[OdpCookieName];
            if (!string.IsNullOrWhiteSpace(cookie))
                return cookie;

            // Allow Header based identification second
            var headers = httpContext.Request.Headers[OdpHeaderName];
            if (!string.IsNullOrWhiteSpace(headers))
               return headers.FirstOrDefault();

            // Allow Query based identification third
            var queryValue = httpContext.Request.Query[OdpQueryParam];
            if (!string.IsNullOrWhiteSpace(queryValue))
                return queryValue.FirstOrDefault();

            // Everything failed...
            return null;
        }

        protected virtual string? VuidToDeviceId(string? vuidValue)
        {
            if (vuidValue is null)
                return null;
            if (vuidValue.Length == 32)
                return vuidValue;
            if (vuidValue.Length < 32)
                return null;
            return vuidValue.Replace("-", string.Empty)[..32];
        }
    }
}
#nullable restore