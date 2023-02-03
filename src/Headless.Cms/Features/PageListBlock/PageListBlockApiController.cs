using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Foundation.ContentActionsApi.Controller;
using EPiServer.Core;
using System.Linq;
using EPiServer.Filters;
using EPiServer;
using HeadlessCms.Features.Shared;
using System.Threading.Tasks;
using System;

namespace HeadlessCms.Features.PageListBlock
{
    [ContentActionApiController(typeof(PageListBlock))]
    public class PageListBlockApiController : ContentActionApiController<PageListBlock>
    {
        private readonly ContentLocator _contentLocator;
        private readonly IContentLoader _contentLoader;

        public PageListBlockApiController(ContentLocator contentLocator, IContentLoader contentLoader)
        {
            _contentLocator = contentLocator;
            _contentLoader = contentLoader;
        }

        [HttpGet]
        public async Task<ActionResult<object>> Index()
        {
            if (CurrentContent is null)
                throw new ApplicationException("Invoking business logic without a resolved instance");
            var pages = FindPages(CurrentContent);
            //pages = pages.Where(x => x.PageTypeName != typeof(FolderPage).Name);
            pages = Sort(pages, CurrentContent.SortOrder);

            if (CurrentContent.Count > 0)
            {
                pages = pages.Take(CurrentContent.Count);
            }

            var model = new {
                Current = ConvertToApiModel(CurrentContent, "contentLink,count,sortOrder"),
                Pages = pages.Select(x => ConvertToApiModel(x)),
                Count = pages.Count()
            };

            await Task.CompletedTask;

            return Ok(model);
        }

        private IEnumerable<PageData> FindPages(PageListBlock currentBlock)
        {
            IEnumerable<PageData> pages = new List<PageData>();
            var current = currentBlock;
            var rootList = currentBlock.Roots?.FilteredItems ?? Enumerable.Empty<ContentAreaItem>();
            if (currentBlock.Recursive)
            {
                if (currentBlock.PageTypeFilter != null)
                {
                    foreach (var root in rootList)
                    {
                        var page = _contentLocator.FindPagesByPageType(root.ContentLink as PageReference, true, currentBlock.PageTypeFilter.ID);
                        pages = pages.Union(page);
                    }
                }
                else
                {
                    foreach (var root in rootList)
                    {
                        var page = _contentLocator.GetAll<PageData>(root.ContentLink as PageReference);
                        pages = pages.Union(page);
                    }
                }
            }
            else
            {
                if (currentBlock.PageTypeFilter != null)
                {
                    foreach (var root in rootList)
                    {
                        var page = _contentLoader.GetChildren<PageData>(root.ContentLink as PageReference)
                            .Where(p => p.ContentTypeID == currentBlock.PageTypeFilter.ID);
                        pages = pages.Union(page);
                    }
                }
                else
                {
                    foreach (var root in rootList)
                    {
                        var page = _contentLoader.GetChildren<PageData>(root.ContentLink as PageReference);
                        pages = pages.Union(page);
                    }
                }
            }
            if (currentBlock.CategoryListFilter != null && currentBlock.CategoryListFilter.Any())
            {
                //pages = pages.Where(x =>
                //{
                //    var categories = (x as ICategorizableContent)?.Categories;
                //    return categories != null &&
                //           categories.Intersect(currentBlock.CategoryListFilter).Any();
                //});
            }
            pages = pages.Where(x => x.VisibleInMenu);

            return pages;
        }

        private static IEnumerable<PageData> Sort(IEnumerable<PageData> pages, FilterSortOrder sortOrder)
        {
            var asCollection = new PageDataCollection(pages);
            var sortFilter = new FilterSort(sortOrder);
            sortFilter.Sort(asCollection);
            return asCollection;
        }
    }
}