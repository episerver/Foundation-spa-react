using EPiServer.Personalization;
using EPiServer.ServiceLocation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Foundation.SpaViewEngine.Infrastructure
{
    [ServiceConfiguration(typeof(IPersonalizationEvaluator), IncludeServiceAccessor = false)]
    public class SpaViewPersonalizationEvaluator : IPersonalizationEvaluator
    {
        protected virtual string PersonalizeCookieKey => SpaViewOptions.PersonalizationConsentCookie;
        protected virtual SpaViewOptions SpaViewOptions { get; }
        private readonly ServiceAccessor<HttpRequestBase> _requestaccessor;

        public SpaViewPersonalizationEvaluator(
            ServiceAccessor<HttpRequestBase> requestAccessor,
            SpaViewOptions spaViewOptions
        ) {
            _requestaccessor = requestAccessor;
            SpaViewOptions = spaViewOptions;
        }

        public bool Personalize()
        {
            var request = _requestaccessor();

            if (SpaViewOptions.DisablePersonalizationUntillCookie && !string.IsNullOrWhiteSpace(PersonalizeCookieKey) &&
                    (request?.Cookies[PersonalizeCookieKey] == null || !bool.TryParse(request?.Cookies[PersonalizeCookieKey].Value, out var enabled) || !enabled))
                return false;

            if (SpaViewOptions.DisableSSRPersonalization && (string.IsNullOrWhiteSpace(request.Headers["Accept"]) || request.Headers["Accept"].ToLowerInvariant() != "application/json"))
                return false;

            if (SpaViewOptions.DisablePersonalizationOnDNT && !string.IsNullOrWhiteSpace(request.Headers["DNT"]) && request.Headers["DNT"] == "1")
                return false;

            return true;
        }
    }
}
