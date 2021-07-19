using EPiServer.ContentApi.Core.Serialization.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.ContentDelivery.Models.Api
{
    public class TypedContentModelReference : ContentModelReference
    {
        public List<string> ContentType { get; set; }
    }
}
