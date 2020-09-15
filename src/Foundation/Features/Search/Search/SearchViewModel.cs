using EPiServer.Core;
using EPiServer.Find.Statistics.Api;
using Foundation.Features.Shared;

namespace Foundation.Features.Search
{
    public class SearchViewModel<T> : ContentViewModel<T> where T : IContent
    {
        public FilterOptionViewModel FilterOption { get; set; }
        public bool HasError { get; set; }
        public string ErrorMessage { get; set; }
        public DidYouMeanResult DidYouMeans { get; set; }
        public string Query { get; set; }
        public bool IsMobile { get; set; }
        public string RedirectUrl { get; set; }
        public ContentSearchViewModel ContentSearchResult { get; set; }

        public SearchViewModel()
        {

        }

        public SearchViewModel(T currentContent) : base(currentContent)
        {

        }
    }
}
