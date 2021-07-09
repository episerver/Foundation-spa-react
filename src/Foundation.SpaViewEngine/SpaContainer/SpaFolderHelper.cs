using EPiServer;
using EPiServer.Core;
using EPiServer.Filters;
using EPiServer.ServiceLocation;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.IO.Compression;
using System.Linq;

namespace Foundation.SpaViewEngine.SpaContainer
{
    public static class SpaFolderHelper
    {
        private static Injected<IContentRepository> _contentRepository;
        private static Injected<IContentLoader> _contentLoader;

        /// <summary>
        /// Get or create the default deployment folder and throw an exception
        /// if more then one such folder exists under the RootPage. This method
        /// completely ignores access checks and should thus only be used from
        /// an initialization method (or equivalent).
        /// </summary>
        /// <returns>The reference to the deployment folder</returns>
        public static ContentReference GetOrCreateDeploymentFolder()
        {
            var spaFolder = _contentLoader.Service.GetChildren<SpaFolder>(ContentReference.RootPage).DefaultIfEmpty(null).SingleOrDefault();
            if (spaFolder != null)
                return spaFolder.ContentLink;
            
            var spaFolderContent = _contentRepository.Service.GetDefault<SpaFolder>(ContentReference.RootPage);
            spaFolderContent.Name = "SpaContainer";
            return _contentRepository.Service.Save(spaFolderContent, EPiServer.DataAccess.SaveAction.Publish, EPiServer.Security.AccessLevel.NoAccess);
        }

        /// <summary>
        /// Try retrieving the default deployment folder, whiles checking 
        /// access to the content items. This ensures that the content is
        /// only available when the current user has access to it.
        /// </summary>
        /// <param name="deploymentFolder">The default deployment folder</param>
        /// <returns>True if found, False otherwise</returns>
        public static bool TryGetDeploymentFolder(out SpaFolder deploymentFolder)
        {
            try
            {
                deploymentFolder = FilterForVisitor.Filter(_contentLoader.Service.GetChildren<SpaFolder>(ContentReference.RootPage)).OfType<SpaFolder>().DefaultIfEmpty(null).SingleOrDefault();
            } catch
            {
                deploymentFolder = null;
                return false;
            }

            return deploymentFolder != null;
        }

        /// <summary>
        /// Get a deployment item by name from the default deployment folder
        /// </summary>
        /// <param name="fileName">The name of the item</param>
        /// <returns>The IContent instance holding the data</returns>
        public static SpaMedia GetDeploymentItem(string fileName) => TryGetDeploymentFolder(out var folder) ? folder.GetDeploymentItem(fileName) : null;
    }
}
