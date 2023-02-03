using Microsoft.AspNetCore.Http;
using System.Linq;
using UNRVLD.ODP;
using UNRVLD.ODP.VisitorGroups;

#nullable enable
namespace HeadlessCms.Infrastructure
{
    public class ODPUserProfile : IODPUserProfile
    {
        private readonly OdpVisitorGroupOptions _optionValues;

        protected virtual string OdpHeaderName => "x-" + _optionValues.OdpCookieName;
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
            return headers.FirstOrDefault();
        }

        protected virtual string? VuidToDeviceId(string? vuidValue)
        {
            if (vuidValue is null)
                return null;
            if (vuidValue.Length == 32)
                return vuidValue;
            if (vuidValue.Length < 36)
                return null;
            return vuidValue[..36].Replace("-", string.Empty);
        }
    }
}
#nullable restore