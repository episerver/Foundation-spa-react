using Castle.Core.Internal;
using EPiServer;
using EPiServer.Core;
using EPiServer.Web.Mvc;
using EPiServer.Web.Mvc.Html;
using Foundation.Cms.Pages;
using Foundation.Find.Cms;
using Foundation.Find.Cms.ViewModels;
using System.Web;
using System.Web.Mvc;

namespace Foundation.Features.Search
{
    public class SearchController : PageController<SearchResultPage>
    {
        private readonly ISearchViewModelFactory _viewModelFactory;
        private readonly ICmsSearchService _cmsSearchService;
        private readonly HttpContextBase _httpContextBase;
        private readonly IContentLoader _contentLoader;

        public SearchController(
            ISearchViewModelFactory viewModelFactory,
            HttpContextBase httpContextBase,
            IContentLoader contentLoader,
            ICmsSearchService cmsSearchService)
        {
            _viewModelFactory = viewModelFactory;
            _httpContextBase = httpContextBase;
            _contentLoader = contentLoader;
            _cmsSearchService = cmsSearchService;
        }

        [ValidateInput(false)]
        [AcceptVerbs(HttpVerbs.Get | HttpVerbs.Post)]
        public ActionResult Index(SearchResultPage currentPage, CmsFilterOptionViewModel filterOptions)
        {
            if (filterOptions == null || filterOptions.Q.IsNullOrEmpty())
            {
                return Redirect(Url.ContentUrl(ContentReference.StartPage));
            }

            if (string.IsNullOrEmpty(filterOptions.ViewSwitcher))
            {
                filterOptions.ViewSwitcher = "List";
            }

            var viewModel = _viewModelFactory.Create<CmsSearchViewModel<SearchResultPage>, SearchResultPage>(currentPage, new CmsArgs
            {
                FilterOption = filterOptions,
                SelectedFacets = HttpContext.Request.QueryString["facets"],
            });

            return View(viewModel);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult QuickSearch(string search = "")
        {
            var model = new CmsSearchViewModel<SearchResultPage>();
            var contentResult = _cmsSearchService.SearchContent(new CmsFilterOptionViewModel()
            {
                Q = search,
                PageSize = 5,
                Page = 1,
                IncludeImagesContent = true
            });
            model.ContentSearchResult = contentResult;

            return View("_QuickSearchAll", model);
        }

        [ChildActionOnly]
        public ActionResult Facet(SearchResultPage currentPage, CmsFilterOptionViewModel viewModel) => PartialView("_Facet", viewModel);


        public class AssetPreloadLink
        {
            public enum AssetType
            {
                Unknown = 0,
                Script = 100,
                Style = 200,
                Image = 300,
                Auto = 400
            }

            private const string Format = "<{0}>; rel=preload; as={1}";
            public string Url { get; set; }
            public AssetType Type { get; set; }
            public bool NoPush { get; set; }

            public AssetPreloadLink()
            {
                Type = AssetType.Auto;
            }

            public AssetPreloadLink(AssetType type)
            {
                Type = type;
            }

            public override string ToString()
            {
                if (Type == AssetType.Auto)
                {
                    if (Url.EndsWith(".js"))
                    {
                        Type = AssetType.Script;
                    }
                    else if (Url.EndsWith(".css"))
                    {
                        Type = AssetType.Style;
                    }
                    else if (Url.EndsWith(".png") || Url.EndsWith(".jpg") || Url.EndsWith(".jpeg"))
                    {
                        Type = AssetType.Image;
                    }
                    else
                    {
                        Type = AssetType.Unknown;
                    }
                }

                if (Type != AssetType.Unknown)
                {
                    var output = string.Format(Format, Url, Type.ToString().ToLowerInvariant());
                    if (NoPush)
                    {
                        return output + "; nopush";
                    }
                    return output;
                }
                return string.Empty;
            }
        }
    }
}