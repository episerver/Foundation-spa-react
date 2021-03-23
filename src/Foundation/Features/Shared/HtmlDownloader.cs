using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace Foundation.Features.Shared
{
    public class HtmlDownloader : IHtmlDownloader
    {
        public async Task<string> DownloadAsync(string baseUrl, string relativeUrl)
        {
            var client = new HttpClient { BaseAddress = new Uri(baseUrl) };
            var fullUrl = client.BaseAddress + relativeUrl;

            var response = await client.GetAsync(fullUrl);
            if (response.StatusCode == HttpStatusCode.NotFound)
            {
                return null;
            }

            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException(
                    string.Format("Request to '{0}' was unsuccessful. Content:\n{1}",
                        fullUrl, await response.Content.ReadAsStringAsync()));
            }

            return await response.Content.ReadAsStringAsync();
        }
    }
}