using EPiServer.ContentApi.Core.Configuration;
using EPiServer.ContentApi.Core.Security.Internal;
using EPiServer.DataAbstraction;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Cors;

namespace Foundation.ContentDelivery.Models
{
    public class EtagCorsPolicyService : CorsPolicyService
    {
        protected CorsPolicyService corsPolicyService;

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
