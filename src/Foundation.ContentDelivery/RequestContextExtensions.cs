using EPiServer.Web;
using EPiServer.Web.Routing;
using System.Web.Routing;

namespace Foundation.ContentDelivery
{
    public static class RequestContextExtensions
    {
        public static readonly string ContextModeKey = "ApiContextMode";

        public static ContextMode GetApiContextMode(this RequestContext requestContext)
        {
            if (requestContext.RouteData.DataTokens.ContainsKey(ContextModeKey))
                return (ContextMode) requestContext.RouteData.DataTokens[ContextModeKey];
            return ContextMode.Undefined;
        }
        public static ContextMode GetApiContextMode(this RequestContext requestContext, ContextMode defaultMode)
        {
            if (requestContext.RouteData.DataTokens.ContainsKey(ContextModeKey))
                return (ContextMode)requestContext.RouteData.DataTokens[ContextModeKey];
            return defaultMode;
        }
        public static bool HasApiContextMode(this RequestContext requestContext)
        {
            return requestContext.RouteData.DataTokens.ContainsKey(ContextModeKey);
        }

        public static void SetApiContextMode(this RequestContext requestContext, ContextMode mode)
        {
            requestContext.RouteData.DataTokens[ContextModeKey] = mode;
            requestContext.SetContextMode(mode); // Also update the base context mode, in case it accessed directly outside the Resolvers
        }
    }
}
