﻿using EPiServer.Cms.Shell.UI.ObjectEditing.EditorDescriptors;
using EPiServer.Core;
using EPiServer.DataAnnotations;
using EPiServer.PlugIn;
using EPiServer.ServiceLocation;
using EPiServer.Shell.ObjectEditing;
using HeadlessCms.Features.Shared.PropertyTypes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System;
using Foundation.Settings.Models;
using Foundation.Settings.Infrastructure;

namespace HeadlessCms.Features.Settings
{
    [SettingsContentType(DisplayName = "Collection Settings",
        GUID = "4356a392-ed29-4895-9e65-bf44fa3db5ca",
        Description = "Selection options settings",
        SettingsName = "Collection Settings")]
    public class CollectionSettings : SettingsBase
    {
        #region Person settings

        [CultureSpecific]
        [Display(GroupName = "CustomSettings", Order = 100)]
        [EditorDescriptor(EditorDescriptorType = typeof(CollectionEditorDescriptor<SelectionItem>))]
        public virtual IList<SelectionItem> Sectors { get; set; }

        [CultureSpecific]
        [Display(GroupName = "CustomSettings", Order = 200)]
        [EditorDescriptor(EditorDescriptorType = typeof(CollectionEditorDescriptor<SelectionItem>))]
        public virtual IList<SelectionItem> Locations { get; set; }

        #endregion

        #region Color settings

        [Display(Name = "Background colors", GroupName = "Colors", Order = 10)]
        [EditorDescriptor(EditorDescriptorType = typeof(CollectionEditorDescriptor<ColorModel>))]
        public virtual IList<ColorModel> BackgroundColor { get; set; }

        [Display(Name = "Heading colors", GroupName = "Colors", Order = 20)]
        [EditorDescriptor(EditorDescriptorType = typeof(CollectionEditorDescriptor<ColorModel>))]
        public virtual IList<ColorModel> HeadingColor { get; set; }

        [Display(Name = "Text colors", GroupName = "Colors", Order = 30)]
        [EditorDescriptor(EditorDescriptorType = typeof(CollectionEditorDescriptor<ColorModel>))]
        public virtual IList<ColorModel> TextColor { get; set; }

        [Display(Name = "Block opacity background colors", GroupName = "Colors", Order = 40)]
        [EditorDescriptor(EditorDescriptorType = typeof(CollectionEditorDescriptor<ColorModel>))]
        public virtual IList<ColorModel> OpacityBackgrounColor { get; set; }

        [Display(Name = "Button background colors", GroupName = "Colors", Order = 50)]
        [EditorDescriptor(EditorDescriptorType = typeof(CollectionEditorDescriptor<ColorModel>))]
        public virtual IList<ColorModel> ButtonBackgroundColor { get; set; }

        [Display(Name = "Button text colors", GroupName = "Colors", Order = 60)]
        [EditorDescriptor(EditorDescriptorType = typeof(CollectionEditorDescriptor<ColorModel>))]
        public virtual IList<ColorModel> ButtonTextColor { get; set; }

        [Display(Name = "Banner background color", GroupName = "Colors", Order = 60)]
        [ClientEditor(ClientEditingClass = "foundation/editors/ColorPicker")]
        public virtual string BannerBackgroundColor { get; set; }

        [Display(Name = "Banner text color", GroupName = "Colors", Order = 70)]
        [ClientEditor(ClientEditingClass = "foundation/editors/ColorPicker")]
        public virtual string BannerTextColor { get; set; }

        [Display(Name = "Link color", GroupName = "Colors", Order = 80)]
        [ClientEditor(ClientEditingClass = "foundation/editors/ColorPicker")]
        public virtual string LinkColor { get; set; }

        #endregion
    }

    public class ColorModel
    {
        [Display(Name = "Color name")]
        public string ColorName { get; set; }

        [Display(Name = "Color code")]
        [ClientEditor(ClientEditingClass = "foundation/editors/ColorPicker")]
        public string ColorCode { get; set; }
    }

    [PropertyDefinitionTypePlugIn]
    public class ColorPropertyList : PropertyList<ColorModel>
    {
    }

    [PropertyDefinitionTypePlugIn]
    public class SelectionItemProperty : PropertyList<SelectionItem>
    {
    }

    public class BackgroundColorSelectionFactory : ISelectionFactory
    {
        public virtual IEnumerable<ISelectItem> GetSelections(ExtendedMetadata metadata)
        {
            ISettingsService _settingService = ServiceLocator.Current.GetInstance<ISettingsService>();
            var collectionSettings = _settingService.GetSiteSettings<CollectionSettings>();
            var backgroundColor = collectionSettings?.BackgroundColor;

            if (backgroundColor is null)
            {
                return new ISelectItem[] { };
            }
            else
            {
                return backgroundColor.Select(d => (new SelectItem() { Text = d.ColorName, Value = d.ColorCode })).ToList();
            }
        }
    }

    public class ButtonBackgroundColorSelectionFactory : ISelectionFactory
    {
        public virtual IEnumerable<ISelectItem> GetSelections(ExtendedMetadata metadata)
        {
            ISettingsService _settingService = ServiceLocator.Current.GetInstance<ISettingsService>();
            var collectionSettings = _settingService.GetSiteSettings<CollectionSettings>();
            var buttonBackgroundColor = collectionSettings?.ButtonBackgroundColor;

            if (buttonBackgroundColor is null)
            {
                return Array.Empty<ISelectItem>();
            }
            else
            {
                return buttonBackgroundColor.Select(d => (new SelectItem() { Text = d.ColorName, Value = d.ColorCode })).ToList();
            }
        }
    }

    public class ButtonTextSelectionFactory : ISelectionFactory
    {
        public virtual IEnumerable<ISelectItem> GetSelections(ExtendedMetadata metadata)
        {
            ISettingsService _settingService = ServiceLocator.Current.GetInstance<ISettingsService>();
            var collectionSettings = _settingService.GetSiteSettings<CollectionSettings>();
            var buttonTextColor = collectionSettings?.ButtonTextColor;

            if (buttonTextColor is null)
            {
                return Array.Empty<ISelectItem>();
            }
            else
            {
                return buttonTextColor.Select(d => (new SelectItem() { Text = d.ColorName, Value = d.ColorCode })).ToList();
            }
        }
    }
}