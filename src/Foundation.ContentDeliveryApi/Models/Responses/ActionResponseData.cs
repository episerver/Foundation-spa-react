using EPiServer.Core;

namespace Foundation.ContentDeliveryApi.Models.Responses
{
    /// <summary>
    /// Holder class for action responses, containing the data exposed by a
    /// controller method to the view.
    /// </summary>
    public class ActionResponseData
    {
        public virtual string ActionName { get; set; }

        /// <summary>
        /// Indicator field to capture the reponse type
        /// </summary>
        public virtual string ResponseType { get; set; } = "ActionResult";

        /// <summary>
        /// The data exposed by the controller method to the view
        /// </summary>
        public virtual object Data { get; set; }

        public virtual string Name { get; set; }

        public virtual ContentReference ContentLink { get; set; }

        public virtual string Url { get; set; }

        public virtual string ResponseObjectType { get; set; }

        public virtual IContent CurrentContent { get; set; }

        public virtual string Language { get; set; }
    }
}
