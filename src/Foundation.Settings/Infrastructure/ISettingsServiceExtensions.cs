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
    public static class ISettingsServiceExtensions
    {
        public static T GetSiteSettingsOrThrow<T>(this ISettingsService settingsService,
            Func<T, bool> shouldThrow,
            string message) where T : SettingsBase
        {
            var settings = settingsService.GetSiteSettings<T>();
            if (settings == null || (shouldThrow?.Invoke(settings) ?? false))
            {
                throw new InvalidOperationException(message);
            }

            return settings;
        }

        public static bool TryGetSiteSettings<T>(this ISettingsService settingsService, out T? value) where T : SettingsBase
        {
            value = settingsService.GetSiteSettings<T>();
            return value != null;
        }
    }
}