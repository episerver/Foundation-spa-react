using System.Collections.Generic;
using System.Web.Routing;
using System.Web.Http;
using EPiServer.ContentApi.Core.Security.Internal;
using System;
using System.Linq;
using EPiServer.Core;
using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.ContentResult;
using System.Net;
using EPiServer.ContentApi.Core.Serialization.Models;
using System.Web.Http.ValueProviders;
using EPiServer.ContentApi.Core.Internal;
using EPiServer.ServiceLocation;
using EPiServer;
using EPiServer.Cms.Shell;

namespace Foundation.Cms.Settings
{
    [RoutePrefix("api/foundation/v1/settings")]
    [ContentApiAuthorization]
    [ContentApiCors]
    [CorsOptionsActionFilter]
    public class SettingsApiController : ApiController
    {
        protected virtual ISettingsService SettingsService { get; private set; }
        protected virtual IContentModelMapper ContentModelMapper { get; private set; }
        protected virtual ContentResultService ContentResultService { get; private set; }

        public SettingsApiController(
            ISettingsService settingsService,
            IContentModelMapper contentModelMapper,
            ContentResultService contentResultService
        ) {
            SettingsService = settingsService;
            ContentModelMapper = contentModelMapper;
            ContentResultService = contentResultService;
        }

        [Route("")]
        [HttpGet]
        public IHttpActionResult Ping()
        {
            return Ok("Settings Service available");
        }

        [Route("{siteId}")]
        [HttpGet]
        public IHttpActionResult ListSettings(Guid siteId)
        {
            var siteSettings = GetSiteSettings(siteId).Select(x => x.Key.Name);
            if (siteSettings.Count() >= 0)
                return Ok(siteSettings);
            return NotFound();
        }

        [Route("{siteId}/{group}")]
        [HttpGet]
        public IHttpActionResult GetSettings(Guid siteId, [ValueProvider(typeof(AcceptLanguageHeaderValueProviderFactory))] List<string> languages, string group, string expand = "")
        {
            var settingGroups = GetSiteSettings(siteId).Where(x => x.Key.Name.Equals(group));
            if (settingGroups.Count() == 0)
                return NotFound();

            if (settingGroups.Count() > 1)
                throw new Exception("Multiple setting groups match this name");

            if (!(settingGroups.First().Value is SettingsBase contentData))
                return NotFound();

            var language = languages.FirstOrDefault();
            if (!string.IsNullOrEmpty(language) && contentData.Language.Name != language)
            {
                var culture = contentData.ExistingLanguages.Where(x => x.Name == language).DefaultIfEmpty(null).FirstOrDefault();
                if (culture == null)
                    return NotFound();
                contentData = ServiceLocator.Current.GetInstance<IContentLoader>().Get<SettingsBase>(contentData.ContentLink, culture);
            }

            var contentModel = ContentModelMapper.TransformContent(contentData, true, expand);
            return new EPiServer.ContentApi.Core.ContentResult.Internal.ContentApiResult<ContentApiModel>(contentModel, HttpStatusCode.OK);
        }

        protected IEnumerable<KeyValuePair<Type, object>> GetSiteSettings(Guid siteId)
        {
            return SettingsService.SiteSettings.Where(x => x.Key == siteId).SelectMany(x => x.Value);
        }

    }
}
