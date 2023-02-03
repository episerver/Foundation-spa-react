using EPiServer;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAccess;
using EPiServer.Framework.TypeScanner;
using EPiServer.Globalization;
using EPiServer.Logging;
using EPiServer.Security;
using EPiServer.Web;
using Foundation.Settings.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace Foundation.Settings.Infrastructure
{
    public interface ISettingsService
    {
        ContentReference? GlobalSettingsRoot { get; set; }
        ConcurrentDictionary<string, Dictionary<Type, SettingsBase>> SiteSettings { get; }
        T? GetSiteSettings<T>(Guid? siteId = null) where T : SettingsBase;
        Dictionary<Type, SettingsBase>? GetSiteSettings(Guid? siteId = null);
        void InitializeSettings();
        void UnintializeSettings();
        void UpdateSettings(Guid siteId, SettingsBase content, bool isContentNotPublished);
        void UpdateSettings();
    }
}