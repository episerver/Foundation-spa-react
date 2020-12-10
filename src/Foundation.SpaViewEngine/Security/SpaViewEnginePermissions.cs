using EPiServer.DataAnnotations;
using EPiServer.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.SpaViewEngine.Security
{
    [PermissionTypes]
    public static class SpaViewEnginePermissions
    {
        public const string GroupName = "SpaViewEnginePermissions";

        static SpaViewEnginePermissions()
        {
            DeploySpa = new PermissionType(GroupName, "DeploySpa");
        }

        public static PermissionType DeploySpa { get; private set; }
    }
}
