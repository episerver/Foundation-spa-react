using EPiServer.Shell;
using EPiServer.Shell.ViewComposition;
using Foundation.Settings.Infrastructure;

namespace Foundation.Settings
{
    [Component]
    public class GlobalSettingsComponent : ComponentDefinitionBase
    {
        public GlobalSettingsComponent()
            : base("epi-cms/component/MainNavigationComponent")
        {
            LanguagePath = "/episerver/cms/components/globalsettings";
            Title = "Site settings";
            SortOrder = 1000;
            PlugInAreas = new[] { PlugInArea.AssetsDefaultGroup };
            Settings.Add(new Setting("repositoryKey", value: GlobalSettingsRepositoryDescriptor.RepositoryKey));
        }
    }
}