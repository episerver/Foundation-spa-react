using EPiServer;
using EPiServer.Core;
using EPiServer.Web.Routing;
using System.Web.Mvc;

namespace Foundation.Features.Search
{
    public class FilterOptionViewModelBinder : DefaultModelBinder
    {
        private readonly IContentLoader _contentLoader;

        public FilterOptionViewModelBinder(IContentLoader contentLoader) => _contentLoader = contentLoader;

        public override object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            bindingContext.ModelName = "FilterOption";
            FilterOptionViewModel model;
            
            try
            {
                model = (FilterOptionViewModel)base.BindModel(controllerContext, bindingContext);
            }
            catch
            {
                model = new FilterOptionViewModel();
            }

            if (model == null)
            {
                return model;
            }

            var contentLink = controllerContext.RequestContext.GetContentLink();
            IContent content = null;
            if (!ContentReference.IsNullOrEmpty(contentLink))
            {
                content = _contentLoader.Get<IContent>(contentLink);
            }

            var query = controllerContext.HttpContext.Request.QueryString["search"];
            var sort = controllerContext.HttpContext.Request.QueryString["sort"];
            var section = controllerContext.HttpContext.Request.QueryString["t"];
            var page = controllerContext.HttpContext.Request.QueryString["p"];
            var confidence = controllerContext.HttpContext.Request.QueryString["confidence"];
            
            SetupModel(model, query, sort, section, page, content, confidence);
            
            return model;
        }

        protected virtual void SetupModel(FilterOptionViewModel model, string q, string sort, string section, string page, IContent content, string confidence)
        {
            EnsurePage(model, page);
            EnsureQ(model, q);
            EnsureSort(model, sort);
            EnsureSection(model, section);
            model.Confidence = decimal.TryParse(confidence, out var confidencePercentage) ? confidencePercentage : 0;
        }

        protected virtual void EnsurePage(FilterOptionViewModel model, string page)
        {
            if (model.Page < 1)
            {
                if (!string.IsNullOrEmpty(page))
                {
                    model.Page = int.Parse(page);
                }
                else
                {
                    model.Page = 1;
                }
            }
        }

        protected virtual void EnsureQ(FilterOptionViewModel model, string q)
        {
            if (string.IsNullOrEmpty(model.Q))
            {
                model.Q = q;
            }
        }

        protected virtual void EnsureSection(FilterOptionViewModel model, string section)
        {
            if (string.IsNullOrEmpty(model.SectionFilter))
            {
                model.SectionFilter = section;
            }
        }

        protected virtual void EnsureSort(FilterOptionViewModel model, string sort)
        {
            if (string.IsNullOrEmpty(model.Sort))
            {
                model.Sort = sort;
            }
        }
    }
}
