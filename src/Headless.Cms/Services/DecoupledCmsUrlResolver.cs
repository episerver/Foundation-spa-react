using EPiServer.ServiceLocation;
using EPiServer.Web;
using EPiServer.Web.Routing;
using Microsoft.AspNetCore.Routing;
using System.Security.Cryptography;
using System.Text;

namespace HeadlessCms.Services
{
    public class DecoupledCmsUrlResolver : UrlResolver, IUrlResolver
    {
        protected readonly UrlResolver BaseUrlResolver;
        protected readonly ProjectRepository ProjectRepository;

        public readonly string PSK = "OptiDecoupeledEdit"; //Should be configurable....

        public DecoupledCmsUrlResolver(UrlResolver baseResolver, ProjectRepository projectRepository) { 
            BaseUrlResolver = baseResolver;
            ProjectRepository = projectRepository;
        }

        public override VirtualPathData GetVirtualPathForNonContent(object partialRoutedObject, string language, VirtualPathArguments virtualPathArguments) => BaseUrlResolver.GetVirtualPathForNonContent(partialRoutedObject, language, virtualPathArguments);

        public override ContentRouteData Route(UrlBuilder urlBuilder, RouteArguments routeArguments) => BaseUrlResolver.Route(urlBuilder, routeArguments);

        public override bool TryToPermanent(string url, out string permanentUrl) => BaseUrlResolver.TryToPermanent(url, out permanentUrl);

        protected override string GetUrlCore(ContentReference contentLink, string language, UrlResolverArguments urlResolverArguments)
        {
            // Get the default and return it if we're not in edit or preview mode
            var defaultUrl = ((IUrlResolver)BaseUrlResolver).GetUrl(contentLink, language, urlResolverArguments);
            if (!urlResolverArguments.ContextMode.EditOrPreview())
                return defaultUrl;

            // If we need to get the latest or published version, update the contentLink
            if (contentLink.GetPublishedOrLatest || contentLink.WorkID == 0)
                contentLink = ServiceLocator.Current.GetInstance<IContentVersionRepository>().LoadCommonDraft(contentLink, language)?.ContentLink ?? contentLink;

            // Build the frontend Page URL
            var pageUrl = ((IUrlResolver)BaseUrlResolver).GetUrl(contentLink, language, new UrlResolverArguments() {
                ContextMode = ContextMode.Default,
                ForceAbsolute = urlResolverArguments.ForceAbsolute,
                ForceCanonical = urlResolverArguments.ForceCanonical,
                RouteValues = urlResolverArguments.RouteValues,
            });

            // Build the new Edit URL
            var builder = new UrlBuilder(defaultUrl)
            {
                Path = $"/{ language }/opti.{urlResolverArguments.ContextMode.ToString().ToLowerInvariant()}",
                QueryId = contentLink.ToString(),
                QueryLanguage = language,
                QueryCollection = {
                    { "mode", urlResolverArguments.ContextMode.ToString().ToLowerInvariant() },
                    { "epibranch", language },
                    { "path", pageUrl ?? "" }
                },
            };

            // Resolve projects to the correct version, so the Frontend will not need to guess for the version to load
            if (builder.QueryCollection.AllKeys.Any(key => "epiprojects".Equals(key, StringComparison.InvariantCultureIgnoreCase)) && int.TryParse(builder.QueryCollection["epiprojects"], out int projectId))
            {
                //var project = ProjectRepository.Get(projectId);
                var projectItems = ProjectRepository.GetItems(new ContentReference[] { contentLink.ToReferenceWithoutVersion() }).Where(pi => pi.ProjectID == projectId && pi.Language.Name == language);
                if (projectItems.Any())
                {
                    builder.QueryCollection.Remove("epiprojects");
                    builder.QueryId = projectItems.First().ContentLink.ToString();
                    contentLink = projectItems.First().ContentLink;
                }
            }

            var hash = Sign(contentLink.ToString(), builder.ToString());
            builder.QueryCollection.Add("hash", hash);
            
            return builder.ToString();
        }

        protected virtual string Sign(string contentId, string path)
        {
            using var sha = SHA256.Create();
            var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(PSK + ":" + path));
            return contentId + ":" + Convert.ToBase64String(bytes);
        }

        protected override string GetUrlCore(UrlBuilder urlBuilderWithInternalUrl, UrlResolverArguments arguments)
        {
            return ((IUrlResolver)BaseUrlResolver).GetUrl(urlBuilderWithInternalUrl, arguments);
        }
    }
}
