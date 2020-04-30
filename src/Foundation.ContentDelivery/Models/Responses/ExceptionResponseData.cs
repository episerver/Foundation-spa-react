using System;

namespace Foundation.ContentDelivery.Models.Responses
{
    public class ExceptionResponseData : BaseErrorResponseData
    {
        public virtual Exception Exception { get; set; }
    }
}
