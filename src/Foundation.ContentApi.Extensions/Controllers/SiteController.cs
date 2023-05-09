using EPiServer.ContentApi.Core.Internal;
using EPiServer.Globalization;
using EPiServer.Security;
using EPiServer.Web;
using EPiServer.Web.Routing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace Foundation.ContentApi.Extensions.Controllers
{
    [ApiController]
    [Route("api/episerver/v3.0/site")]
    [ContentLanguageFilter]
    [Authorize(Policy = "ContentDeliveryAuthorizationPolicy")]
    public class SiteController : Controller
    {
        protected readonly IContentLoader ContentLoader;
        protected readonly ISiteDefinitionRepository SiteDefinitionRepository;
        protected readonly IUrlResolver UrlResolver;

        public SiteController (
            IContentLoader contentLoader, 
            ISiteDefinitionRepository siteDefinitionRepository,
            IUrlResolver urlResolver
        )
        {
            ContentLoader = contentLoader;
            SiteDefinitionRepository = siteDefinitionRepository;
            UrlResolver = urlResolver;
        }

        /// <summary>
        /// Extension to the sites services, allowing to query for all routes that
        /// are part of the given website.
        /// </summary>
        /// <param name="id">The Website identifier (GUID)</param>
        /// <param name="languages">The language for which to fetch the routes, if multiple languages are provided, the first enabled language will be used.</param>
        /// <returns></returns>
        [HttpGet]
        [Route("{id}/routes")]
        public ActionResult<IEnumerable<string>> GetRoutes(
            Guid id,
            [FromHeader(Name = "Accept-Language")] List<string> languages
        )
        {
            var website = SiteDefinitionRepository.Get(id);
            if (website is null)
                return NotFound();
            var language = GetLanguage(languages, website);
            var allPages = ContentLoader.GetDescendents(website.StartPage);
            return Ok(allPages.Where(cref => IsAccessible(cref, language)).Select(cref => GetUrl(cref, language)).Where(url => url is not null));
        }

        [NonAction]
        protected virtual bool IsAccessible(ContentReference contentReference, CultureInfo language)
        {
            // If the content cannot be loaded, it's not accessible
            if (!ContentLoader.TryGet(contentReference, language, out IContent iContent))
                return false;

            // If the content is securable, but cannot be read, it's not accessible
            var ipa = ServiceLocator.Current.GetInstance<IPrincipalAccessor>();
            if (iContent is ISecurable securable && !securable.GetSecurityDescriptor().HasAccess(ipa.Principal, AccessLevel.Read))
            {
                return false;
            }

            // If the content is versionable, it must be published
            if (iContent is IVersionable versionable && (versionable.Status != VersionStatus.Published || (versionable.StopPublish is not null && DateTime.Now >= versionable.StopPublish))) 
            {
                return false;
            }

            // Well content should be public, right....
            return true;

        }

        /// <summary>
        /// Get the Absolute URL to the content
        /// </summary>
        /// <param name="contentLink"></param>
        /// <param name="language"></param>
        /// <returns></returns>
        [NonAction]
        protected virtual string GetUrl(ContentReference contentLink, CultureInfo language) => UrlResolver.GetUrl(
            contentLink, 
            language.Name, 
            new UrlResolverArguments() {
                ForceAbsolute = true,
                ContextMode = ContextMode.Default
            }
        );

        /// <summary>
        /// 
        /// </summary>
        /// <param name="languages"></param>
        /// <returns></returns>
        [NonAction]
        protected virtual CultureInfo GetLanguage(List<string>? languages, SiteDefinition? site = null)
        {
            var enabledLanguages = ServiceLocator.Current.GetInstance<ILanguageBranchRepository>().ListEnabled();
            if (languages is not null && languages.Any())
            {
                string? firstEnabled = languages.Select(x => x.Split(";").First()).Where(x => x != "*").FirstOrDefault(x => enabledLanguages.Any(e => e.LanguageID == x));
                if (firstEnabled is not null)
                    return CultureInfo.GetCultureInfo(firstEnabled);
                if (!languages.Any(x => x == "*"))
                    throw new ArgumentOutOfRangeException("Accept-Language", string.Join(",", languages), "None of the requested languages are available");
            }
            return site is not null && ContentLoader.TryGet(site.StartPage, out IContent c) && c is ILocalizable l ? l.MasterLanguage : ContentLanguage.PreferredCulture;

        }
    }
}
