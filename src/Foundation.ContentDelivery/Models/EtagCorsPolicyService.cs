using EPiServer.ContentApi.Core.Configuration;
using EPiServer.ContentApi.Core.Security.Internal;
using EPiServer.DataAbstraction;
using EPiServer.Web;
using System.Net.Http;
using System.Web.Cors;

namespace Foundation.ContentDelivery.Models
{
    /// <summary>
    /// Slightly updated Cors Policy, allowing clients access to read the etag header when requested
    /// </summary>
    public class EtagCorsPolicyService : CorsPolicyService
    {
        public EtagCorsPolicyService(ContentApiConfiguration apiConfiguration, ISiteDefinitionResolver siteDefinitionResolver, ILanguageBranchRepository languageBranchRepository)
            : base(apiConfiguration, siteDefinitionResolver, languageBranchRepository)
        {
            // No class specific rules
        }

        public override CorsPolicy GetOrCreatePolicy(HttpRequestMessage request)
        {
            var policy = base.GetOrCreatePolicy(request);
            if (!policy.ExposedHeaders.Contains("etag"))
                policy.ExposedHeaders.Add("etag");
            return policy;
        }
    }
}
