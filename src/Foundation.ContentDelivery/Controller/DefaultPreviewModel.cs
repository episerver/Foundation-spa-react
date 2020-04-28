using EPiServer.Core;
using Foundation.Cms.Pages;
using Foundation.Cms.ViewModels;
using System.Collections.Generic;

namespace Foundation.ContentDelivery.Controller
{
    public class DefaultPreviewModel : ContentViewModel<FoundationPageData>
    {
        public DefaultPreviewModel(FoundationPageData currentPage, IContent previewContent)
            : base(currentPage)
        {
            PreviewContent = previewContent;
            Areas = new List<PreviewArea>();
        }

        public IContent PreviewContent { get; set; }
        public List<PreviewArea> Areas { get; set; }

        public class PreviewArea
        {
            public bool Supported { get; set; }
            public string AreaName { get; set; }
            public string AreaTag { get; set; }
            public ContentArea ContentArea { get; set; }
        }
    }
}
