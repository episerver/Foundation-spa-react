using EPiServer.ContentApi.Routing;
using EPiServer.Web.Routing.Segments;
using System.Web;

namespace Foundation.ContentDelivery.Infrastructure
{
    /// <summary>
    /// Add support of the controller method invocation through the rewriten requests.
    /// </summary>
    public class ContentDeliveryApiRouter : ContentApiRouteService
    {
        public override bool ShouldRouteRequest(HttpRequestBase request)
        {
            return base.ShouldRouteRequest(request);
        }

        /// <summary>
        /// Verify if the controller method has been explicitly specified in the routingContext
        /// if so, rewrite to the controller method handler.
        /// </summary>
        /// <param name="routingContext">The routing context for the current request</param>
        /// <returns>The rewritten URL</returns>
        public override string BuildRewritePath(SegmentContext routingContext)
        {
            if ((string)routingContext.RouteData.Values["action"] == routingContext.LastConsumedFragment)
            {
                return BuildActionServicePath(routingContext);
            }
            return base.BuildRewritePath(routingContext);
        }

        protected virtual string BuildActionServicePath(SegmentContext routingContext)
        {
            return "/api/episerver/v3/action/" +
                routingContext.RoutedContentLink.ID + "/" +
                routingContext.RouteData.Values["action"];
        }
    }
}
