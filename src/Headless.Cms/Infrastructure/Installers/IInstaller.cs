using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace HeadlessCms.Infrastructure.Installers
{
    public interface IInstaller 
    {
        public int Order { get; }
        public IList<string> InstallMessages { get; }
        public bool Install(HttpContext context);
    }
}