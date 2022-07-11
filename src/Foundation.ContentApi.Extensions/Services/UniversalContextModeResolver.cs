using EPiServer.ContentApi.Core.Configuration;
using EPiServer.Framework.Modules;
using EPiServer.Web;
using EPiServer.Web.Routing;
using EPiServer.Editor;
using Foundation.ContentApi.Extensions.Infrastructure;
using Microsoft.AspNetCore.Http;
using System;
using System.Text.RegularExpressions;
using System.Web;
using IDefaultContextModeResolver = EPiServer.Web.IContextModeResolver;
using IContentApiContextModeResolver = EPiServer.ContentApi.Core.Internal.IContextModeResolver;
using Microsoft.Extensions.Primitives;

namespace Foundation.ContentApi.Extensions.Services
{
    public class UniversalContextModeResolver : IDefaultContextModeResolver, IContentApiContextModeResolver
    {
        protected readonly IHttpContextAccessor _httpContextAccessor;
        protected readonly IModuleResourceResolver _moduleResourceResolver;
        protected readonly Regex _editRouteRegex = new(",{2}\\d+", RegexOptions.Compiled);
        protected readonly ContentApiOptions _contentApiOptions;
        protected readonly IApiRequestAssessor _apiRequestAssessor;

        public UniversalContextModeResolver(
            IHttpContextAccessor httpContextAccessor,
            IModuleResourceResolver moduleResourceResolver,
            ContentApiOptions contentApiOptions,
            IApiRequestAssessor apiRequestAssessor
        ) {
            _httpContextAccessor = httpContextAccessor;
            _moduleResourceResolver = moduleResourceResolver;
            _contentApiOptions = contentApiOptions;
            _apiRequestAssessor = apiRequestAssessor;
        }

        protected readonly string PreviewHeader = "X-PreviewMode";

        public ContextMode CurrentMode
        {
            get
            {
                HttpContext? httpContext = _httpContextAccessor.HttpContext;
                if (httpContext?.Request is null)
                    return ContextMode.Default;

                if (httpContext.Items.ContainsKey(RoutingConstants.ContextModeKey) && httpContext.Items[RoutingConstants.ContextModeKey] is ContextMode mode)
                   return mode;
                
                ContextMode contextMode = Resolve(httpContext.Request.GetAbsoluteUrl());
                if (contextMode is ContextMode.Default)
                    contextMode = ResolveHeader(httpContext.Request);
                
                httpContext.Items[RoutingConstants.ContextModeKey] = contextMode;
                return contextMode;
            }
        }

        public ContextMode ResolveHeader(HttpRequest request, ContextMode defaultContextMode = ContextMode.Default)
        {
            StringValues previewHeader = request.Headers.ContainsKey(PreviewHeader) ? request.Headers[PreviewHeader] : string.Empty;
            if (previewHeader.Equals("edit"))
                return ContextMode.Edit;

            if (previewHeader.Equals("preview"))
                return ContextMode.Preview;
            
            return defaultContextMode;
        }

        public ContextMode Resolve(string contentUrl, ContextMode defaultContextMode = ContextMode.Default)
        {
            if (Uri.TryCreate(contentUrl, UriKind.Absolute, out var contentUri))
            {
                if (IsCmsUrl(contentUri) || (_contentApiOptions.EnablePreviewMode && _apiRequestAssessor.IsApiUri(contentUri)))
                {
                    if (IsEditingUrl(contentUri))
                        return ContextMode.Edit;

                    if (IsPreviewUrl(contentUri))
                        return ContextMode.Preview;
                }
            }

            return defaultContextMode;
        }

        protected bool IsCmsUrl(Uri contentUri)
        {
            var path = contentUri.IsAbsoluteUri ? contentUri.AbsolutePath : contentUri.LocalPath;
            return !string.IsNullOrWhiteSpace(path) && path.StartsWith(_moduleResourceResolver.ResolvePath("CMS", null), StringComparison.InvariantCultureIgnoreCase);
        }

        protected bool IsPreviewUrl(Uri contentUri)
        {
            var path = contentUri.AbsolutePath;
            return !string.IsNullOrWhiteSpace(path) && _editRouteRegex.IsMatch(path);
        }

        protected bool IsEditingUrl(Uri contentUri)
        {
            var epiEditMode = HttpUtility.ParseQueryString(contentUri.Query).Get(PageEditing.EpiEditMode);
            return !string.IsNullOrWhiteSpace(epiEditMode) && epiEditMode.Equals("true", StringComparison.OrdinalIgnoreCase);
        }
    }
}
