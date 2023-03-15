using EPiServer.Cms.Shell;
using EPiServer.Cms.Shell.UI.Configurations;
using EPiServer.Cms.Shell.UI.Notifications.Feature.Internal;
using EPiServer.Cms.Shell.UI.Rest.Projects;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.Framework.TypeScanner;
using EPiServer.Security;
using EPiServer.ServiceLocation;
using EPiServer.Shell;
using EPiServer.Shell.Modules;
using EPiServer.Shell.UI.Internal;
using EPiServer.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.ApiExplorer
{
    public class ApiExplorerModule : ShellModule
    {
        public ApiExplorerModule(string name, string routeBasePath, string resourceBasePath) : base(name, routeBasePath, resourceBasePath)
        {
        }

        public ApiExplorerModule(string name, string routeBasePath, string resourceBasePath, ITypeScannerLookup typeScannerLookup, IFileProvider virtualPathProvider) : base(name, routeBasePath, resourceBasePath, typeScannerLookup, virtualPathProvider)
        {
        }
    }
}
