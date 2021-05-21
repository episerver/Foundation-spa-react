using EPiServer.ServiceLocation;
using EPiServer.ContentApi.Core.ContentResult;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace Foundation.ContentDelivery.Models
{
    public class ControllerActionApiResult<T> : IHttpActionResult
    {

        protected virtual ContentResultService ContentResultService { get; }
        public virtual T Value { get; }
        public virtual HttpStatusCode HttpStatusCode { get; }

        public virtual HttpRequestMessage Request { get; set; } = null;

        public ControllerActionApiResult(T value) : this(value, HttpStatusCode.OK, ServiceLocator.Current.GetInstance<ContentResultService>()) { }
        public ControllerActionApiResult(T value, HttpStatusCode statusCode) : this(value, statusCode, ServiceLocator.Current.GetInstance<ContentResultService>()) { }
        public ControllerActionApiResult(T value, HttpStatusCode statusCode, ContentResultService contentResultService)
        {
            Value = value;
            HttpStatusCode = statusCode;
            ContentResultService = contentResultService;
        }

        public virtual Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            var response = new HttpResponseMessage(HttpStatusCode)
            {
                Content = ContentResultService.BuildContent(Value)
            };
            return Task.FromResult(response);
        }
    }
}
