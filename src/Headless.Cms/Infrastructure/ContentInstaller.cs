using EPiServer.ServiceLocation;
using EPiServer.Web;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HeadlessCms.Infrastructure.Installers;

namespace HeadlessCms.Infrastructure
{
    public class ContentInstaller : IBlockingFirstRequestInitializer
    {
        private readonly ISiteDefinitionRepository _siteDefinitionRepository;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public IEnumerable<IInstaller> Installers => ServiceLocator.Current.GetAllInstances<IInstaller>();

        public bool CanRunInParallel => false;

        public bool IsInstalled => _siteDefinitionRepository.List().Any();

        public ContentInstaller(
            ISiteDefinitionRepository siteDefinitionRepository,
            IWebHostEnvironment webHostEnvironment
        ) {
            _siteDefinitionRepository = siteDefinitionRepository;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task InitializeAsync(HttpContext httpContext)
        {
            if (!IsInstalled)
                RunInstallers(httpContext);

            await Task.CompletedTask;
        }

        protected virtual void RunInstallers(HttpContext httpContext)
        {
            bool installNext = true;
            foreach (var installer in Installers.OrderBy(x => x.Order))
            {
                if (!installNext)
                    continue;
                installNext = installer.Install(httpContext);
            }
        }

    }
}
