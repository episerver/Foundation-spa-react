namespace Foundation.ContentDelivery.Models
{
    /// <summary>
    /// Convert view models to JSON strings
    /// </summary>
    public interface IViewModelSerializer
    {
        string ConvertToJson(object viewModel);
    }
}
