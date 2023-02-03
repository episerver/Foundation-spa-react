using EPiServer.ServiceLocation;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Foundation.ContentActionsApi.Infrastructure
{
    [Options]
    public class ContentActionApiOptions
    {
        public virtual PathString ServicePath { get; set; } = new PathString("/api/episerver/v3.0/contentaction");
    }
}
