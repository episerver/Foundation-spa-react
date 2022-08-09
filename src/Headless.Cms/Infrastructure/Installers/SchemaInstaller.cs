using EPiServer.ContentDefinitionsApi.Manifest;
using EPiServer.ContentDefinitionsApi.Manifest.Internal;
using EPiServer.DataAbstraction;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace HeadlessCms.Infrastructure.Installers
{
    public class SchemaInstaller : BaseInstaller
    {
        private readonly ILogger<SchemaInstaller> _logger;
        private readonly IEnumerable<IManifestSectionHandler> _manifestSectionHandlers;
        private readonly IEnumerable<JsonConverter> _converters;
        public string InitialSchemaFile => "foundation.contentmanifest.json";
        public override int Order => 10;

        public SchemaInstaller(
            IEnumerable<IManifestSectionHandler> manifestSectionHandlers,
            ILogger<SchemaInstaller> logger,
            IEnumerable<JsonConverter> converters
        ) {
            _manifestSectionHandlers = manifestSectionHandlers;
            _converters = converters;
            _logger = logger;
        }

        public override bool Install(HttpContext context)
        {
            if (TryGetSourceFile(InitialSchemaFile, out var schema))
            {
                using var schemaData = new StreamReader(schema.CreateReadStream());
                var jsonData = schemaData.ReadToEnd();
                var manifest = JsonConvert.DeserializeObject<ManifestModel>(jsonData, new JsonSerializerSettings { 
                    Converters = _converters.ToList()
                });
                if (manifest is null)
                    throw new Exception("Invalid schema file");
                var sections = string.Join(", ", manifest.Sections.Select(x => x.Key));
                _logger.LogDebug("Sections in schema: {sections}", sections);

                foreach (var section in _manifestSectionHandlers.OrderBy(x => x.Order))
                {
                    var sectionData = manifest.Sections.Where(x => string.Equals(x.Key, section.SectionName, StringComparison.OrdinalIgnoreCase)).Select(data => data.Value).SingleOrDefault();
                    if (sectionData != null)
                    {
                        _logger.LogDebug($"Processing section: ${ section.SectionName }");
                        var ctx = new ImportContext
                        {
                            AllowedUpgrades = VersionComponent.Major,
                            ContinueOnError = true,
                            Force = true,
                        };
                        try
                        {
                            section.Import(sectionData, ctx);
                        }
                        catch (Exception e)
                        {
                            _logger.LogError(e, "An erorr occured while importing the manifest");
                        }
                        finally
                        {
                            ctx.Log.SendToILogger(_logger);
                        }

                    }
                }
            }
            
            return true;
        }
    }

    public static class LogEntryExtensions 
    {
        public static IEnumerable<ImportLogMessage> SendToILogger(this IEnumerable<ImportLogMessage> logMessages, ILogger logger)
        {
            // Output log entries
            foreach (var logEntry in logMessages) {
                var message = $"Schema import: {logEntry.Message}";    
                switch (logEntry.Severity) {
                    case ImportLogMessageSeverity.Error:
                        logger.LogError(message);
                        break;
                    case ImportLogMessageSeverity.Warning:
                        logger.LogWarning(message);
                        break;
                    case ImportLogMessageSeverity.Success:
                    case ImportLogMessageSeverity.Information:
                        logger.LogInformation(message);
                        break;
                    default:
                        logger.LogDebug(message);
                        break;
                }   
            }
            return logMessages;
        }
    }
}