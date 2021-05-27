using EPiServer.DataAnnotations;
using EPiServer.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.SpaViewEngine.Security
{
    /// <summary>
    /// Register a function permission for the SpaViewEngine Deployment service
    /// this ensures that the user does not only have access to the folder, but
    /// also has the right to deploy a new version through the API.
    /// </summary>
    [PermissionTypes]
    public static class SpaViewEnginePermissions
    {
        /// <summary>
        /// The Name of the Permission Group as provided by this Class
        /// </summary>
        public const string GroupName = "SpaViewEnginePermissions";

        /// <summary>
        /// Initialization of the Permissions
        /// </summary>
        static SpaViewEnginePermissions()
        {
            DeploySpa = new PermissionType(GroupName, "DeploySpa");
        }

        /// <summary>
        /// The permission used to deploy the SPA
        /// </summary>
        public static PermissionType DeploySpa { get; private set; }
    }
}
