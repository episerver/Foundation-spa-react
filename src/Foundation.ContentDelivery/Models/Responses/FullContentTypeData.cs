using System.Collections.Generic;

namespace Foundation.ContentDelivery.Models.Responses
{
    public class FullContentTypeData : BasicContentTypeData
    {
        public IList<ContentTypePropertyData> Properties { get; } = new List<ContentTypePropertyData>();
    }
}
