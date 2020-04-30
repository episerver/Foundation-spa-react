using EPiServer.ServiceLocation;
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

        protected virtual IViewModelSerializer ViewModelSerializer { get; }
        public virtual T Value { get; }
        public virtual HttpStatusCode HttpStatusCode { get; }

        public virtual HttpRequestMessage Request { get; set; } = null;

        public ControllerActionApiResult(T value) : this(value, HttpStatusCode.OK, ServiceLocator.Current.GetInstance<IViewModelSerializer>())
        {

        }
        public ControllerActionApiResult(T value, HttpStatusCode statusCode) : this(value, statusCode, ServiceLocator.Current.GetInstance<IViewModelSerializer>())
        {

        }
        public ControllerActionApiResult(T value, HttpStatusCode statusCode, IViewModelSerializer viewModelSerializer)
        {
            Value = value;
            HttpStatusCode = statusCode;
            ViewModelSerializer = viewModelSerializer;
        }

        public virtual Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            var response = new HttpResponseMessage(HttpStatusCode)
            {
                Content = new StringContent(ViewModelSerializer.ConvertToJson(Value), Encoding.UTF8, "application/json")
            };
            return Task.FromResult(response);
        }
    }
}
