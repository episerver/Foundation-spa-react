using EPiServer;
using EPiServer.Filters;
using EPiServer.ServiceLocation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.SpaViewEngine.SpaContainer
{
    public static class SpaFolderExtensions
    {
        private static IContentLoader ContentLoader => ServiceLocator.Current.GetInstance<IContentLoader>();

        public static IEnumerable<SpaMedia> GetDeploymentItems(this SpaFolder folder)
        {
            return FilterForVisitor.Filter(ContentLoader.GetChildren<SpaMedia>(folder.ContentLink)).OfType<SpaMedia>();
        }

        public static SpaMedia GetDeploymentItem(this SpaFolder folder, string fileName)
        {
            return folder.GetDeploymentItems().Where(x => x.Name == fileName).DefaultIfEmpty(null).FirstOrDefault();
        }
    }
}
