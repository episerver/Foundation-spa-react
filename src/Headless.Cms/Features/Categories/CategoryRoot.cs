using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.Framework.Localization;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using System;
using System.ComponentModel.DataAnnotations;

namespace HeadlessCms.Features.Categories
{
    [AdministrationSettings(CodeOnly = true, GroupName = "systemtypes")]
    [ContentType(GUID = "c29bf090-05bf-43eb-98d6-91575bce4441", AvailableInEditMode = false, GroupName = "Categories")]
    public class CategoryRoot : CategoryData
    {
        internal Func<ISiteDefinitionRepository> GetSiteDefinitionRepository { get; set; }
        internal Func<LocalizationService> GetLocalizationService { get; set; }

        public CategoryRoot()
        {
            GetSiteDefinitionRepository = () =>
            {
                ISiteDefinitionRepository instance;
                ServiceLocator.Current.TryGetExistingInstance(out instance);
                return instance;
            };

            GetLocalizationService = () =>
            {
                LocalizationService instance;
                ServiceLocator.Current.TryGetExistingInstance(out instance);
                return instance;
            };
        }

        public override string Name
        {
            get
            {
                if (ContentReference.IsNullOrEmpty(ParentLink))
                    return base.Name;

                return GetLocalizedAssetsFolderName(base.Name);
            }
            set
            {
                base.Name = value;
            }
        }

        [ScaffoldColumn(false)]
        [Editable(false)]
        public override bool IsSelectable { get; set; }

        public override void SetDefaultValues(ContentType contentType)
        {
            base.SetDefaultValues(contentType);
            IsSelectable = false;
        }

        private string GetLocalizedAssetsFolderName(string name)
        {
            ISiteDefinitionRepository definitionRepository = GetSiteDefinitionRepository();
            LocalizationService localizationService = GetLocalizationService();

            if (definitionRepository != null && localizationService != null)
            {
                foreach (SiteDefinition siteDefinition in definitionRepository.List())
                {
                    if (ParentLink.CompareToIgnoreWorkID(siteDefinition.GlobalAssetsRoot))
                        return localizationService.GetString("/episerver/cms/widget/hierachicallist/roots/globalroot/label", name);

                    if (ParentLink.CompareToIgnoreWorkID(siteDefinition.SiteAssetsRoot))
                        return localizationService.GetString("/episerver/cms/widget/hierachicallist/roots/siteroot/label", name);
                }
            }

            return name;
        }
    }
}