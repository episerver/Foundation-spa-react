using System;

namespace Foundation.ContentDeliveryApi.Models.Responses
{
    public class ExceptionResponseData : BaseErrorResponseData
    {
        public virtual Exception Exception { get; set; }
    }
}
