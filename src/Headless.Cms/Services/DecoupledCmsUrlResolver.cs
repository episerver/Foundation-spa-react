using EPiServer.Web;
using EPiServer.Web.Routing;
using Microsoft.AspNetCore.Routing;
using System.Security.Cryptography;
using System.Text;

namespace HeadlessCms.Services
{
    public class DecoupledCmsUrlResolver : UrlResolver, IUrlResolver
    {
        protected readonly UrlResolver BaseUrlResolver;

        public readonly string PSK = "OptiDecoupeledEdit"; //Should be configurable....

        public DecoupledCmsUrlResolver(UrlResolver baseResolver) { 
            BaseUrlResolver = baseResolver;
        }

        public override VirtualPathData GetVirtualPathForNonContent(object partialRoutedObject, string language, VirtualPathArguments virtualPathArguments) => BaseUrlResolver.GetVirtualPathForNonContent(partialRoutedObject, language, virtualPathArguments);

        public override ContentRouteData Route(UrlBuilder urlBuilder, RouteArguments routeArguments) => BaseUrlResolver.Route(urlBuilder, routeArguments);

        public override bool TryToPermanent(string url, out string permanentUrl) => BaseUrlResolver.TryToPermanent(url, out permanentUrl);

        protected override string GetUrlCore(ContentReference contentLink, string language, UrlResolverArguments urlResolverArguments)
        {
            var defaultUrl = ((IUrlResolver)BaseUrlResolver).GetUrl(contentLink, language, urlResolverArguments);
            if (!urlResolverArguments.ContextMode.EditOrPreview())
                return defaultUrl;

            var pageUrl = ((IUrlResolver)BaseUrlResolver).GetUrl(contentLink, language, new UrlResolverArguments() {
                ContextMode = ContextMode.Default,
                ForceAbsolute = urlResolverArguments.ForceAbsolute,
                ForceCanonical = urlResolverArguments.ForceCanonical,
                RouteValues = urlResolverArguments.RouteValues,
            });

            var builder = new UrlBuilder(defaultUrl)
            {
                Path = $"/{ language }/opti.{urlResolverArguments.ContextMode.ToString().ToLowerInvariant()}",
                QueryCollection = {
                    { "id", contentLink.ToString() },
                    { "mode", urlResolverArguments.ContextMode.ToString().ToLowerInvariant() },
                    { "epibranch", language },
                    { "path", pageUrl ?? "" }
                }
            };
            var hash = Sign(contentLink.ToString(), builder.ToString());
            builder.QueryCollection.Add("hash", hash);
            
            return builder.ToString();
        }

        protected virtual string Sign(string contentId, string path)
        {
            using (var sha = SHA256.Create())
            {
                var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(PSK + ":" + path));
                return contentId + ":" + Convert.ToBase64String(bytes);
            }
        }

        protected override string GetUrlCore(UrlBuilder urlBuilderWithInternalUrl, UrlResolverArguments arguments)
        {
            return ((IUrlResolver)BaseUrlResolver).GetUrl(urlBuilderWithInternalUrl, arguments);
        }
    }
}
