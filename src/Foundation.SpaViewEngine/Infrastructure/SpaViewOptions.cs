using EPiServer.ServiceLocation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.SpaViewEngine.Infrastructure
{
    [Options]
    public class SpaViewOptions
    {
        /// <summary>
        /// Get / Set if the SSR output should be personalized
        /// </summary>
        public virtual bool DisableSSRPersonalization { get; set; } = true;

        /// <summary>
        /// Get / Set if the DNT header should disable personalization
        /// </summary>
        public virtual bool DisablePersonalizationOnDNT { get; set; } = false;

        /// <summary>
        /// Get / Set if the personalization should be disabled untill the value of a specified cookie evaluates to true
        /// </summary>
        public virtual bool DisablePersonalizationUntillCookie { get; set; } = true;

        /// <summary>
        /// Get / Set the cookie name for the personalization consent marker
        /// </summary>
        public virtual string PersonalizationConsentCookie { get; set; } = "DxpPersonalization";
    }
}
