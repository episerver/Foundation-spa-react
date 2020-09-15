using Boilerplate.Web.Mvc.OpenGraph;
using EPiServer;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using EPiServer.Web.Routing;
using Foundation.Features.Blog.BlogItemPage;
using Foundation.Features.Category;
using Foundation.Features.Home;
using Foundation.Features.Locations.LocationItemPage;
using Foundation.Features.Locations.TagPage;
using Foundation.Features.Shared;
using Foundation.Features.StandardPage;
using Foundation.Infrastructure.OpenGraph;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Foundation.Helpers
{
    public static class OpenGraphHelpers
    {
        private static readonly Lazy<IContentLoader> _contentLoader = new Lazy<IContentLoader>(() => ServiceLocator.Current.GetInstance<IContentLoader>());
        private static readonly Lazy<IContentTypeRepository> _contentTypeRepository = new Lazy<IContentTypeRepository>(() => ServiceLocator.Current.GetInstance<IContentTypeRepository>());

        public static IHtmlString RenderOpenGraphMetaData(this HtmlHelper helper, IContentViewModel<IContent> contentViewModel)
        {
            var metaTitle = (contentViewModel.CurrentContent as FoundationPageData)?.MetaTitle ?? contentViewModel.CurrentContent.Name;
            var defaultLocale = EPiServer.Globalization.GlobalizationSettings.CultureLanguageCode;
            IEnumerable<string> alternateLocales = null;
            string contentType = null;
            string imageUrl = null;

            if (contentViewModel.CurrentContent is FoundationPageData && ((FoundationPageData)contentViewModel.CurrentContent).PageImage != null)
            {
                imageUrl = GetUrl(((FoundationPageData)contentViewModel.CurrentContent).PageImage);
            }
            else
            {
                imageUrl = GetDefaultImageUrl();
            }

            if (contentViewModel.CurrentContent is FoundationPageData pageData)
            {
                alternateLocales = pageData.ExistingLanguages.Where(culture => culture.TextInfo.CultureName != defaultLocale)
                            .Select(culture => culture.TextInfo.CultureName.Replace('-', '_'));
            }

            if (contentViewModel.CurrentContent is FoundationPageData)
            {
                if (((FoundationPageData)contentViewModel.CurrentContent).MetaContentType != null)
                {
                    contentType = ((FoundationPageData)contentViewModel.CurrentContent).MetaContentType;
                }
                else
                {
                    var pageType = _contentTypeRepository.Value.Load(contentViewModel.CurrentContent.GetOriginalType());
                    contentType = pageType.DisplayName;
                }
            }

            switch (contentViewModel.CurrentContent)
            {
                case HomePage homePage:
                    var openGraphHomePage = new OpenGraphHomePage(metaTitle, new OpenGraphImage(imageUrl), GetUrl(homePage.ContentLink))
                    {
                        Description = homePage.PageDescription,
                        Locale = defaultLocale.Replace('-', '_'),
                        AlternateLocales = alternateLocales,
                        ContentType = contentType,
                        Category = GetCategoryNames(homePage.Categories),
                        ModifiedTime = homePage.Changed,
                        PublishedTime = homePage.StartPublish ?? null,
                        ExpirationTime = homePage.StopPublish ?? null
                    };

                    return helper.OpenGraph(openGraphHomePage);

                case LocationItemPage locationItemPage:
                    var openGraphLocationItemPage = new OpenGraphLocationItemPage(metaTitle, new OpenGraphImage(imageUrl), GetUrl(contentViewModel.CurrentContent.ContentLink))
                    {
                        Description = locationItemPage.PageDescription,
                        Locale = defaultLocale.Replace('-', '_'),
                        AlternateLocales = alternateLocales,
                        ContentType = contentType,
                        ModifiedTime = locationItemPage.Changed,
                        PublishedTime = locationItemPage.StartPublish ?? null,
                        ExpirationTime = locationItemPage.StopPublish ?? null
                    };

                    var categories = new List<string>();

                    if (locationItemPage.Continent != null)
                    {
                        categories.Add(locationItemPage.Continent);
                    }

                    if (locationItemPage.Country != null)
                    {
                        categories.Add(locationItemPage.Country);
                    }

                    openGraphLocationItemPage.Category = categories;

                    var tags = new List<string>();
                    var items = ((LocationItemPage)contentViewModel.CurrentContent).Categories;
                    if (items != null)
                    {
                        foreach (var item in items)
                        {
                            tags.Add(_contentLoader.Value.Get<StandardCategory>(item).Name);
                        }
                    }
                    openGraphLocationItemPage.Tags = tags;

                    return helper.OpenGraph(openGraphLocationItemPage);

                case BlogItemPage _:
                case StandardPage _:
                case TagPage _:
                    var openGraphArticle = new OpenGraphFoundationPageData(metaTitle, new OpenGraphImage(imageUrl), GetUrl(contentViewModel.CurrentContent.ContentLink))
                    {
                        Description = ((FoundationPageData)contentViewModel.CurrentContent).PageDescription,
                        Locale = defaultLocale.Replace('-', '_'),
                        AlternateLocales = alternateLocales,
                        ContentType = contentType,
                        ModifiedTime = ((FoundationPageData)contentViewModel.CurrentContent).Changed,
                        PublishedTime = ((FoundationPageData)contentViewModel.CurrentContent).StartPublish ?? null,
                        ExpirationTime = ((FoundationPageData)contentViewModel.CurrentContent).StopPublish ?? null
                    };

                    return helper.OpenGraph(openGraphArticle);

                case FoundationPageData foundationPageData:
                    var openGraphFoundationPage = new OpenGraphFoundationPageData(metaTitle, new OpenGraphImage(imageUrl), GetUrl(foundationPageData.ContentLink))
                    {
                        Description = foundationPageData.PageDescription,
                        Locale = defaultLocale.Replace('-', '_'),
                        AlternateLocales = alternateLocales,
                        Author = foundationPageData.AuthorMetaData,
                        ContentType = contentType,
                        Category = GetCategoryNames(foundationPageData.Categories),
                        ModifiedTime = foundationPageData.Changed,
                        PublishedTime = foundationPageData.StartPublish ?? null,
                        ExpirationTime = foundationPageData.StopPublish ?? null
                    };

                    return helper.OpenGraph(openGraphFoundationPage);
            }

            return new HtmlString(string.Empty);
        }

        private static string GetDefaultImageUrl()
        {
            var startPage = _contentLoader.Value.Get<HomePage>(ContentReference.StartPage);
            var siteUrl = SiteDefinition.Current.SiteUrl;
            var url = new Uri(siteUrl, UrlResolver.Current.GetUrl(startPage.SiteLogo));

            return url.ToString();
        }

        private static string GetUrl(ContentReference content)
        {
            var siteUrl = SiteDefinition.Current.SiteUrl;
            var url = new Uri(siteUrl, UrlResolver.Current.GetUrl(content));

            return url.ToString();
        }

        private static IEnumerable<string> GetCategoryNames(IEnumerable<ContentReference> categories)
        {
            if (categories == null)
            {
                yield break;
            }
            foreach (var category in categories)
            {
                yield return _contentLoader.Value.Get<IContent>(category).Name;
            }
        }
    }
}