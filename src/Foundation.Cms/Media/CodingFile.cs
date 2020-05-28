using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.Framework.DataAnnotations;
using System.ComponentModel.DataAnnotations;

namespace Foundation.Cms.Media
{
    [ContentType(DisplayName = "CodingFile", GUID = "3f62c064-74f2-415e-ac8c-c6423d3b532f", Description = "Used for coding file types such as Css, Javascript")]
    [MediaDescriptor(ExtensionString = "css,js")]
    public class CodingFile : MediaData
    {
        [CultureSpecific]
        [Display(GroupName = SystemTabNames.Content, Order = 10)]
        public virtual string Description { get; set; }
    }
}