using EPiServer;
using EPiServer.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Foundation.ContentActionsApi.Controller;
using Microsoft.AspNetCore.Http.Extensions;

namespace Foundation.ContentActionsApi.Infrastructure
{
    public class RouteTransformer : DynamicRouteValueTransformer
    {
        protected ApplicationPartManager ApplicationPartManager { get; }
        protected IContentLoader ContentLoader { get;  }

        protected IEnumerable<TypeInfo> ContentActionApiControllers
        {
            get
            {
                var feature = new ControllerFeature();
                ApplicationPartManager.PopulateFeature(feature);
                return feature.Controllers.Where(c =>
                    c.GetCustomAttributes<ContentActionApiControllerAttribute>().Any()
                );
            }
        }

        public RouteTransformer(
            ApplicationPartManager applicationPartManager,
            IContentLoader contentLoader
        ) {
            ApplicationPartManager = applicationPartManager;
            ContentLoader = contentLoader;
        }

        public override ValueTask<IReadOnlyList<Endpoint>> FilterAsync(HttpContext httpContext, RouteValueDictionary values, IReadOnlyList<Endpoint> endpoints)
        {
            return base.FilterAsync(httpContext, values, endpoints);
        }

        public override ValueTask<RouteValueDictionary> TransformAsync(HttpContext httpContext, RouteValueDictionary values)
        {
            values["controller"] = "ContentActionApiError";
            values["action"] = "RoutingError";

            // Get the Content Item from the provided contentId
            string? contentId = values.ContainsKey("contentId") ? values["contentId"]?.ToString() : string.Empty;
            if (string.IsNullOrWhiteSpace(contentId))
                return ValueTask.FromResult(values);
            var language = httpContext.Request.GetLanguage();
            values["language"] = language;
            IContent contentItem;
            if (Guid.TryParse(contentId, out Guid contentGuid) && ContentLoader.TryGet(contentGuid, language, out IContent contentByGuid))
                contentItem = contentByGuid;
            else if (ContentReference.TryParse(contentId, out ContentReference contentRef) && ContentLoader.TryGet(contentRef, language, out IContent contentByReference))
                contentItem = contentByReference;
            else
            {
                values["controller"] = "ContentActionApiError";
                values["action"] = "ContentNotFound";
                return ValueTask.FromResult(values);
            }

            // Get the Requested action from the provided URL
            string? actionName = values.ContainsKey("actionName") ? values["actionName"]?.ToString() : string.Empty;

            //Resolve the controller
            Type contentType = contentItem.GetOriginalType();
            values["contentType"] = contentType.Name;
            var controllerType = GetContentActionApiControllers(contentType).FirstOrDefault();
            if (controllerType == null)
            {
                values["controller"] = "ContentActionApiError";
                values["action"] = "ControllerNotFound";
                return ValueTask.FromResult(values);
            }

            // Build new value dictionary
            values.Remove("actionName");
            values["controller"] = GetControllerName(controllerType);
            values["content"] = contentItem;
            values["action"] = actionName;
            values["slug"] = string.IsNullOrEmpty(values["slug"]?.ToString()) ? values["slug"] : values["slug"]?.ToString()?.Split("/");
            
            //httpContext.Request.Path = $"/api/extensions/contentactions";
            return ValueTask.FromResult(values);
        }

        protected static string GetControllerName(TypeInfo controllerClass)
        {
            var className = controllerClass.Name;
            return className.EndsWith("Controller") ? className[0..^10] : className;
        }

        protected IEnumerable<TypeInfo> GetContentActionApiControllers(Type forContentType)
        {
            if (!forContentType.IsAssignableTo(typeof(IContentData))) // Only resolve for types managed by the CMS
                return Array.Empty<TypeInfo>();

            var feature = new ControllerFeature();
            ApplicationPartManager.PopulateFeature(feature);
            return feature.Controllers.Where(c =>
                c.GetCustomAttributes<ContentActionApiControllerAttribute>().Any(aca => aca.IsControllerFor(forContentType))
            );
        }
    }
}
