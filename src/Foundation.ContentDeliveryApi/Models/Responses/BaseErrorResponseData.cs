namespace Foundation.ContentDeliveryApi.Models.Responses
{
    /// <summary>
    /// Generic data model for error responses from the Action service
    /// </summary>
    public abstract class BaseErrorResponseData
    {
        public virtual string ErrorMessage { get; set; }
    }
}
