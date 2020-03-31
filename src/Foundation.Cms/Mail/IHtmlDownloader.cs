using System.Threading.Tasks;

namespace Foundation.Cms.Mail
{
    public interface IHtmlDownloader
    {
        Task<string> DownloadAsync(string baseUrl, string relativeUrl);
    }
}