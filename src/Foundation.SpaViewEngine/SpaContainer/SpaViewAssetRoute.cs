using EPiServer.Web.Routing;
using EPiServer.Web.Routing.Segments;
using EPiServer.Web.Routing.Segments.Internal;
using System.Web;
using System.Web.Routing;

namespace Foundation.SpaViewEngine.SpaContainer
{
    public class SpaViewAssetRoute : Route, IContentRoute
    {

        public string Name => "SpaViewAssetRoute";

        public SpaViewAssetRoute() : base("spaview/{container}/{*path}", new SpaRouteHandler())
        {

        }

        public override RouteData GetRouteData(HttpContextBase httpContext)
        {
            if (httpContext != null && httpContext.Items.Contains((object)RoutingConstants.HandledRouteDataKey))
                return httpContext.Items[(object)RoutingConstants.HandledRouteDataKey] as RouteData;

            string str = httpContext.Request.AppRelativeCurrentExecutionFilePath.Substring(2) + httpContext.Request.PathInfo;
            RequestSegmentContext requestSegmentContext1 = new RequestSegmentContext(httpContext, new RouteData((RouteBase)this, this.RouteHandler));
            requestSegmentContext1.RemainingPath = str;
            requestSegmentContext1.Defaults = Defaults;
            RequestSegmentContext requestSegmentContext2 = requestSegmentContext1;
            requestSegmentContext2.RouteData = this.RouteSegmentContext((SegmentContext)requestSegmentContext2);
            if (requestSegmentContext2.RouteData == null)
                return (RouteData)null;
            if (!this.MatchConstraints((SegmentContext)requestSegmentContext2, httpContext))
                return (RouteData)null;
            return requestSegmentContext2.RouteData;
        }


        public bool MatchConstraints(SegmentContext segmentContext, HttpContextBase context)
        {
            if (segmentContext != null) return MatchSegmentConstraints(segmentContext);
            if (context != null) return MatchHttpContextConstraints(context);
            return false;
        }

        private bool MatchSegmentConstraints(SegmentContext segmentContext)
        {
            return (segmentContext.RoutedObject as SpaMedia) != null;
        }

        private bool MatchHttpContextConstraints(HttpContextBase context)
        {
            return false;
        }

        /**
         * First invoked during routing process, constructs route data 
         */
        public RouteData RouteSegmentContext(SegmentContext segmentContext)
        {
            var pathSegments = segmentContext.GetNextValue(segmentContext.GetNextValue(segmentContext.RemainingPath).Remaining);
            if (pathSegments.Remaining == null || pathSegments.Remaining.Length == 0) return null;
            var routedItem = SpaFolderHelper.GetDeploymentItem(pathSegments.Next);
            if (routedItem == null) return null;
            if (!SpaFolderHelper.HasItemInDeployment(routedItem, pathSegments.Remaining)) return null;


            segmentContext.RouteData.Values.Add("container", pathSegments.Next);
            segmentContext.RouteData.Values.Add("path", pathSegments.Remaining);
            segmentContext.RemainingPath = "";
            segmentContext.RoutedContentLink = routedItem.ContentLink;
            segmentContext.RoutedObject = routedItem;

            return segmentContext.RouteData;

        }
    }
}
