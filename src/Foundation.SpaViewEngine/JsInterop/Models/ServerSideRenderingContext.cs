using EPiServer;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using EPiServer.Web.Routing;
using Foundation.ContentDeliveryApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Helpers;

namespace Foundation.SpaViewEngine.JsInterop.Models
{
    [ServiceConfiguration(typeof(ServerSideRenderingContext), Lifecycle = ServiceInstanceScope.Transient)]
    public class ServerSideRenderingContext : JavaScriptObject
    {
        private string _website;
        private string _startPageData;
        protected virtual IViewModelSerializer ModelSerializer { get; }
        protected virtual IContentLoader ContentLoader { get; }
        protected virtual ILanguageBranchRepository LanguageBranchRepository { get; }
        protected virtual IUrlResolver UrlResolver { get; }

        /// <summary>
        /// Reference to the JavaScript compatible location object, which 
        /// holds the location information for the current request.
        /// </summary>
        public virtual Location Location { get; } = new Location();

        /// <summary>
        /// The current path of this request
        /// </summary>
        public virtual string Path => Location.pathname;

        /// <summary>
        /// The JSON Serialized representation of the current IContent being
        /// rendered.
        /// </summary>
        public virtual string IContent { get; set; }

        /// <summary>
        /// The JSON Serialized ContentLink for the current content
        /// </summary>
        public virtual string ContentLink { get; set; }

        /// <summary>
        /// The JSON Serialized Website definition of the current website
        /// </summary>
        public virtual string Website
        {
            get
            {
                if (_website == null)
                {
                    _website = ModelSerializer.ConvertToJson(GetWebsite(SiteDefinition.Current));
                }
                return _website;
            }
        }

        /// <summary>
        /// The JSON Serialized content of the homepage, which typically holds the appropriate settings
        /// </summary>
        public virtual string StartPageData
        {
            get
            {
                if (_startPageData == null)
                {
                    _startPageData = ModelSerializer.ConvertToJson(GetStartPageData(SiteDefinition.Current));
                }
                return _startPageData;
            }
        }

        public ServerSideRenderingContext(
            IViewModelSerializer viewModelSerializer,
            IUrlResolver urlResolver,
            ILanguageBranchRepository languageBranchRepository,
            IContentLoader contentLoader
        )
        {
            ModelSerializer = viewModelSerializer;
            UrlResolver = urlResolver;
            LanguageBranchRepository = languageBranchRepository;
            ContentLoader = contentLoader;
        }

        protected virtual PageData GetStartPageData(SiteDefinition site) => ContentLoader.Get<PageData>(site.StartPage);

        protected virtual Website GetWebsite(SiteDefinition site)
        {
            return new Website()
            {
                id = site.Id,
                name = site.Name,
                contentRoots = GetContentRoots(site),
                languages = GetEnabledLanguages(site.StartPage)
            };
        }

        protected virtual Dictionary<string, ContentLink> GetContentRoots(SiteDefinition site)
        {
            return new Dictionary<string, ContentLink>
            {
                { "startPage", BuildContentLink(site.StartPage) },
                { "rootPage", BuildContentLink(site.RootPage) }
            };
        }

        protected virtual List<Language> GetEnabledLanguages(ContentReference startPage)
        {
            var pageData = ContentLoader.Get<PageData>(startPage);
            var languages = new List<Language>();
            foreach (var branch in LanguageBranchRepository.ListEnabled().OrderBy(branch => { return branch.SortIndex; }))
            {
                languages.Add(new Language()
                {
                    name = branch.LanguageID,
                    displayName = branch.Name,
                    isMasterLanguage = pageData.MasterLanguage.Name.Equals(branch.LanguageID),
                    link = branch.URLSegment
                });
            }
            return languages;
        }

        protected virtual ContentLink BuildContentLink(ContentReference reference)
        {
            return new ContentLink()
            {
                id = reference.ID,
                providerName = reference.ProviderName,
                workId = reference.WorkID,
                url = UrlResolver.GetUrl(reference)
            };
        }

        public virtual string ContextInfo { get; set; } = "";

        public virtual string ToJson()
        {
            var builder = new StringBuilder();
            builder.Append("{");
            builder.Append("\"Location\": {},");
            builder.Append("\"Path\": " + Json.Encode(Path) + ",");
            builder.Append("\"IContent\":" + IContent.Replace("</script>", "<\\/script>") + ",");
            builder.Append("\"ContentLink\": " + ContentLink.Replace("</script>", "<\\/script>") + ",");
            builder.Append("\"Website\": " + Website.Replace("</script>", "<\\/script>") + ",");
            builder.Append("\"StartPageData\": " + StartPageData.Replace("</script>", "<\\/script>") + ",");
            builder.Append("\"ContextInfo\": " + Json.Encode(ContextInfo) + "");
            builder.Append("}");
            return builder.ToString();
        }
    }
}
