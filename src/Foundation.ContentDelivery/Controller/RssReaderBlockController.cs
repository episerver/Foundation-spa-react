using EPiServer.Framework.DataAnnotations;
using EPiServer.Web.Mvc;
using Foundation.Cms.Blocks;
using Foundation.Cms.ViewModels.Blocks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Xml.Linq;

namespace Foundation.ContentDelivery.Controller
{
    [TemplateDescriptor(Default = true, ModelType = typeof(RssReaderBlock))]
    public class RssReaderBlockController : BlockController<RssReaderBlock>
    {
        public override ActionResult Index(RssReaderBlock currentContent)
        {
            var viewModel = new RssReaderBlockViewModel
            {
                RssList = new List<RssReaderBlockViewModel.RssItem>(),
                CurrentBlock = currentContent
            };

            try
            {
                if(currentContent.RssUrl != null && !currentContent.RssUrl.IsEmpty())
                {
                    var rssDocument = XDocument.Load(Convert.ToString(currentContent.RssUrl));

                    var posts = from item in rssDocument.Descendants("item").Take(currentContent.MaxCount)
                                select new RssReaderBlockViewModel.RssItem
                                {
                                    Title = item.Element("title").Value,
                                    Url = item.Element("link").Value,
                                    PublishDate = item.Element("pubDate").Value
                                };

                    viewModel.RssList = posts.ToList();
                    viewModel.HasHeadingText = HasHeadingText(currentContent);
                    viewModel.Heading = currentContent.Heading;
                    viewModel.DescriptiveText = currentContent.MainBody;
                }
            }
            catch (Exception)
            {
                viewModel.HasHeadingText = true;
                viewModel.Heading = "Invalid RSS Feed Url.";
            }

            return PartialView(viewModel);
        }

        private bool HasHeadingText(RssReaderBlock currentBlock) => ((!string.IsNullOrEmpty(currentBlock.Heading)) || ((currentBlock.MainBody != null) && (!currentBlock.MainBody.IsEmpty)));

    }
}
