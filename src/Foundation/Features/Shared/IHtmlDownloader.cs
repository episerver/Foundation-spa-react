using System.Threading.Tasks;

namespace Foundation.Features.Shared
{
    public interface IHtmlDownloader
    {
        Task<string> DownloadAsync(string baseUrl, string relativeUrl);
    }
}