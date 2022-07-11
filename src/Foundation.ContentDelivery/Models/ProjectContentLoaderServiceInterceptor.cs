using EPiServer;
using EPiServer.ContentApi.Core;
using EPiServer.ContentApi.Core.Security;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.Security;
using EPiServer.Web;
using EPiServer.Web.Routing;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Foundation.ContentDelivery.Models
{
    /// <summary>
    /// Specific variant of the ProjectAwareContentLoaderService, which takes 
    /// the current instance and wraps that to provide the "original" 
    /// GetChildren methods. This prevents these enhancements from breaking the
    /// ContentDeliveryApi.Commerce packages.
    /// </summary>
    class ProjectContentLoaderServiceInterceptor : ProjectAwareContentLoaderService
    {
        public ContentLoaderService BaseService { get; protected set; }

        public ProjectContentLoaderServiceInterceptor
            (ContentLoaderService baseService, IProjectResolver projectResolver, ProjectRepository projectRepository, ISecurityPrincipal principalAccessor, IContentLoader contentLoader, IPermanentLinkMapper permanentLinkMapper, IUrlResolver urlResolver, ContentApiContextModeResolver contextModeResolver, IContentProviderManager providerManager):
            base(contentLoader, permanentLinkMapper, urlResolver, contextModeResolver, providerManager,projectResolver, projectRepository, principalAccessor)
        {
            BaseService = baseService;
        }
       
        public override IEnumerable<IContent> GetChildren(ContentReference contentReference, string language) => BaseService.GetChildren(contentReference, language);
        public override ContentDeliveryQueryRange<IContent> GetChildren(Guid contentGuid, string language, PagingToken token, Func<IContent, bool> predicate = null) => BaseService.GetChildren(contentGuid, language, token, predicate);
        public override ContentDeliveryQueryRange<IContent> GetChildren(ContentReference contentReference, string language, PagingToken token, Func<IContent, bool> predicate = null) => BaseService.GetChildren(contentReference, language, token, predicate);
    }
}
