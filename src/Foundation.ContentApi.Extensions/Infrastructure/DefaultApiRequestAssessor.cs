using System;
using EPiServer.ContentApi.Cms;
using EPiServer.ContentApi.Search;

namespace Foundation.ContentApi.Extensions.Infrastructure
{
    /// <summary>
    /// Default implementation of the the IApiRequestAssessor, only considering the standard CMS
    /// and Search & Navigation modules. Add your own implementation if you need support for
    /// the Commerce API and related Search & Navigation Module
    /// </summary>
    public class DefaultApiRequestAssessor : IApiRequestAssessor
    {
        protected virtual ContentDeliveryApiOptions CmsConfiguration { get; }
        protected virtual ContentSearchApiOptions SearchConfiguration { get; }

        public DefaultApiRequestAssessor(
            ContentDeliveryApiOptions cmsConfiguration,
            ContentSearchApiOptions searchConfiguration
        )
        {
            CmsConfiguration = cmsConfiguration;
            SearchConfiguration = searchConfiguration;
        }

        public virtual bool IsApiUri(Uri requestUri)
        {
            var path = requestUri.AbsolutePath;

            if (string.IsNullOrWhiteSpace(path))
                return false;

            return
                path.StartsWith(CmsConfiguration.BaseRoute.ToString(), StringComparison.InvariantCultureIgnoreCase) ||
                path.StartsWith(SearchConfiguration.BaseRoute.ToString(), StringComparison.InvariantCultureIgnoreCase);
        }
    }
}
