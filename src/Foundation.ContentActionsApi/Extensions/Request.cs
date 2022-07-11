using EPiServer.Globalization;
using Foundation.ContentActionsApi.Infrastructure;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace Microsoft.AspNetCore.Http.Extensions
{
    public static class HttpRequestExtensions
    {
        public static IEnumerable<LanguageRequest> GetLanguageRequests(this HttpRequest request)
        {
            string languageKey = "x-epi-language";

            var inputs = new string[] {
                request.Query.ContainsKey(languageKey) ? request.Query[languageKey].ToString() : string.Empty,
                request.Headers[languageKey].ToString(),
                request.Headers.AcceptLanguage.ToString()
            };

            return inputs
                .SelectMany(x => x.Split(",", StringSplitOptions.TrimEntries & StringSplitOptions.RemoveEmptyEntries).Select(y => new LanguageRequest(y)));
        }

        public static IEnumerable<CultureInfo> GetLanguages(this HttpRequest request)
        {
            var langs = request.GetLanguageRequests()
                .OrderByDescending(x => x.Weight)
                .TrySelect(x => x.CultureInfo, false)
                .Where(x => x is not null && !string.IsNullOrEmpty(x.Name))
                .Cast<CultureInfo>();

            return langs;
        }

        public static CultureInfo GetLanguage(this HttpRequest request) => request.GetLanguages().FirstOrDefault(ContentLanguage.PreferredCulture);
    }
}
