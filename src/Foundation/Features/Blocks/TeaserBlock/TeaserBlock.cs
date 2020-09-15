using EPiBootstrapArea;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.Labs.ContentManager.Cards;
using EPiServer.Labs.ContentManager.Dashboard;
using EPiServer.Shell.ObjectEditing;
using EPiServer.Web;
using Foundation.Cms.EditorDescriptors;
using Foundation.Features.Shared;
using Foundation.Infrastructure;
using System.ComponentModel.DataAnnotations;

namespace Foundation.Features.Blocks.TeaserBlock
{
    [ContentType(DisplayName = "Teaser Block",
        GUID = "EB67A99A-E239-41B8-9C59-20EAA5936047",
        Description = "Image block with overlay for text",
        GroupName = GroupNames.Content)]
    [DefaultDisplayOption(ContentAreaTags.OneThirdWidth)]
    [ImageUrl("~/assets/icons/cms/blocks/CMS-icon-block-26.png")]
    public class TeaserBlock : FoundationBlockData, IDashboardItem
    {
        [CultureSpecific]
        [Required(AllowEmptyStrings = false)]
        [Display(GroupName = SystemTabNames.Content, Order = 10)]
        public virtual string Heading { get; set; }

        [Display(Name = "Heading size", GroupName = SystemTabNames.Content, Order = 11)]
        public virtual int HeadingSize { get; set; }

        [SelectOne(SelectionFactoryType = typeof(TeaserBlockHeadingStyleSelectionFactory))]
        [Display(Name = "Heading style", GroupName = SystemTabNames.Content, Order = 12)]
        public virtual string HeadingStyle { get; set; }


        [SelectOne(SelectionFactoryType = typeof(TeaserBlockTextColorSelectionFactory))]
        [Display(Name = "Heading color", GroupName = SystemTabNames.Content, Order = 13)]
        public virtual string HeadingColor { get; set; }

        [CultureSpecific]
        [Display(GroupName = SystemTabNames.Content, Order = 20)]
        public virtual string Description { get; set; }

        [CultureSpecific]
        [Display(GroupName = SystemTabNames.Content, Order = 30)]
        public virtual XhtmlString Text { get; set; }

        [CultureSpecific]
        [UIHint(UIHint.Image)]
        [Display(GroupName = SystemTabNames.Content, Order = 40)]
        public virtual ContentReference Image { get; set; }

        [Range(1, 100, ErrorMessage = "Set image width from 1 to 100")]
        [Display(Name = "Image size (%)", GroupName = SystemTabNames.Content, Order = 41)]
        public virtual int ImageSize { get; set; }

        [CultureSpecific]
        [UIHint(UIHint.Image)]
        [Display(GroupName = SystemTabNames.Content, Order = 45)]
        public virtual ContentReference SecondImage { get; set; }

        [Range(1, 100, ErrorMessage = "Set image width from 1 to 100")]
        [Display(Name = "Image size (%)", GroupName = SystemTabNames.Content, Order = 46)]
        public virtual int SecondImageSize { get; set; }

        [SelectOne(SelectionFactoryType = typeof(TeaserBlockTextColorSelectionFactory))]
        [Display(Name = "Text color", GroupName = SystemTabNames.Content, Order = 50)]
        public virtual string TextColor { get; set; }

        [SelectOne(SelectionFactoryType = typeof(TeaserBlockElementAlignmentSelectionFactory))]
        [Display(Name = "Elements alignment (except Text)", GroupName = SystemTabNames.Content, Order = 80)]
        public virtual string ElementsAlignment { get; set; }

        [Display(GroupName = SystemTabNames.Content, Order = 90)]
        public virtual PageReference Link { get; set; }

        [SelectOne(SelectionFactoryType = typeof(TeaserBlockHeightStyleSelectionFactory))]
        [Display(Name = "Height", GroupName = TabNames.BlockStyling, Order = 100)]
        public virtual string Height { get; set; }

        public override void SetDefaultValues(ContentType contentType)
        {
            base.SetDefaultValues(contentType);

            HeadingSize = 28;
            HeadingStyle = "none";
            HeadingColor = "black";
            ImageSize = 100;
            SecondImageSize = 100;
            ElementsAlignment = "center";
            BackgroundColor = "transparent";
            TextColor = "black";
        }

        public void SetItem(ItemModel itemModel)
        {
            itemModel.Description = Heading;
            itemModel.Image = Image;
        }
    }
}