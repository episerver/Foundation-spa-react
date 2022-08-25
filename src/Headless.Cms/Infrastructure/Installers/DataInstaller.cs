using EPiServer;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.Enterprise;
using EPiServer.Find.Cms;
using EPiServer.Scheduler;
using EPiServer.Security;
using EPiServer.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using Foundation.Settings.Models;

namespace HeadlessCms.Infrastructure.Installers
{
    public class DataInstaller : BaseInstaller
    {
        private readonly ISiteDefinitionRepository _siteDefinitionRepository;
        private readonly ContentRootService _contentRootService;
        private readonly IContentRepository _contentRepository;
        private readonly IDataImporter _dataImporter;
        private readonly ILanguageBranchRepository _languageBranchRepository;
        private readonly EventedIndexingSettings _eventedIndexingSettings;
        private readonly ILogger<DataInstaller> _logger;

        public string DefaultWebsiteName => "foundation-mvc-cms";
        public string InitialDataFile => "foundation.episerverdata";
        public override int Order => 20;

        public DataInstaller(
            ISiteDefinitionRepository siteDefinitionRepository,
            ContentRootService contentRootService,
            IContentRepository contentRepository,
            IDataImporter dataImporter,
            ILanguageBranchRepository languageBranchRepository,
            EventedIndexingSettings eventedIndexingSettings,
            ILogger<DataInstaller> logger
        ) {
            _siteDefinitionRepository = siteDefinitionRepository;
            _contentRootService = contentRootService;
            _contentRepository = contentRepository;
            _dataImporter = dataImporter;
            _languageBranchRepository = languageBranchRepository;
            _eventedIndexingSettings = eventedIndexingSettings;
            _logger = logger;
        }

        public override bool Install(HttpContext context)
        {
            if (TryGetSourceFile(InitialDataFile, out var fileInfo))
            {
                using var siteDataStream = fileInfo.CreateReadStream();
                var siteDefinition = CreateSiteDefinition(context, DefaultWebsiteName);
                var registeredRoots = _contentRepository.GetItems(_contentRootService.List(), new LoaderOptions());
                InstallSettings(registeredRoots);
                CreateSite(siteDataStream, siteDefinition, ContentReference.RootPage);
            }
            return true;
        }

        protected virtual void InstallSettings(IEnumerable<IContent> registeredRoots)
        {
            var settingsRootRegistered = registeredRoots.Any(x => x.ContentGuid == SettingsFolder.SettingsRootGuid && x.Name.Equals(SettingsFolder.SettingsRootName));

            if (!settingsRootRegistered)
            {
                _contentRootService.Register<SettingsFolder>(SettingsFolder.SettingsRootName + "IMPORT", SettingsFolder.SettingsRootGuid, ContentReference.RootPage);
            }
        }
        protected virtual SiteDefinition CreateSiteDefinition(HttpContext context, string name)
        {
            var request = context.Request;
            var siteDefinition = _siteDefinitionRepository.List().FirstOrDefault(site => site.Name.Equals(DefaultWebsiteName, StringComparison.OrdinalIgnoreCase));
            if (siteDefinition is not null)
                return siteDefinition;
            siteDefinition = new SiteDefinition {
                Name = name,
                SiteUrl = new Uri(request.GetDisplayUrl()),
            };
            siteDefinition.Hosts.Add(new HostDefinition {
                Name = request.Host.Value,
                Type = HostDefinitionType.Primary
            });
            siteDefinition.Hosts.Add(new HostDefinition {
                Name = request.Host.Host,
                Type = HostDefinitionType.Undefined
            });
            siteDefinition.Hosts.Add(new HostDefinition {
                Name = HostDefinition.WildcardHostName,
                Type = HostDefinitionType.Undefined
            });
            return siteDefinition;
        }

        private void CreateSite(Stream stream, SiteDefinition siteDefinition, ContentReference startPage)
        {
            _eventedIndexingSettings.EventedIndexingEnabled = false;
            _eventedIndexingSettings.ScheduledPageQueueEnabled = false;
            ImportEpiserverContent(stream, startPage, siteDefinition);
            _eventedIndexingSettings.EventedIndexingEnabled = true;
            _eventedIndexingSettings.ScheduledPageQueueEnabled = true;
        }

        public bool ImportEpiserverContent(Stream stream,
            ContentReference destinationRoot,
            SiteDefinition siteDefinition = null)
        {
            var success = false;
            try
            {
                var log = _dataImporter.Import(stream, destinationRoot, new ImportOptions
                {
                    KeepIdentity = true,
                    EnsureContentNameUniqueness = false,
                });

                var status = _dataImporter.Status;

                if (status == null)
                {
                    return false;
                }

                UpdateLanguageBranches(status);
                if (siteDefinition != null && !ContentReference.IsNullOrEmpty(status.ImportedRoot))
                {
                    siteDefinition.StartPage = status.ImportedRoot;
                    _siteDefinitionRepository.Save(siteDefinition);
                    SiteDefinition.Current = siteDefinition;
                    success = true;
                }
            }
            catch (Exception)
            {
                success = false;
            }

            return success;
        }

        private void UpdateLanguageBranches(IImportStatus status)
        {
            if (status.ContentLanguages == null)
            {
                return;
            }

            foreach (var languageId in status.ContentLanguages)
            {
                var languageBranch = _languageBranchRepository.Load(languageId);

                if (languageBranch == null)
                {
                    languageBranch = new LanguageBranch(languageId);
                    _languageBranchRepository.Save(languageBranch);
                }
                else if (!languageBranch.Enabled)
                {
                    languageBranch = languageBranch.CreateWritableClone();
                    languageBranch.Enabled = true;
                    _languageBranchRepository.Save(languageBranch);
                }
            }
        }
    }
}