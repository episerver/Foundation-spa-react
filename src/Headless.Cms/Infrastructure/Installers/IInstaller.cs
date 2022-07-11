using Microsoft.AspNetCore.Http;

namespace HeadlessCms.Infrastructure.Installers
{
    public interface IInstaller 
    {
        public int Order { get; }
        public bool Install(HttpContext context);
    }
}