using EPiServer.Core;
using EPiServer.SpecializedProperties;
using Foundation.Features.Blocks.MenuItemBlock;
using Foundation.Features.Home;
using System;
using System.Collections.Generic;

namespace Foundation.Features.Header
{
    public class HeaderViewModel
    {
        public virtual HomePage HomePage { get; set; }
        public int LogoHeight { get; set; }
        public ContentReference CurrentContentLink { get; set; }
        public Guid CurrentContentGuid { get; set; }
        public LinkItemCollection UserLinks { get; set; }
        public string Name { get; set; }
        public List<MenuItemViewModel> MenuItems { get; set; }
        public bool IsReadonlyMode { get; set; }
    }
}