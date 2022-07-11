using EPiServer.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.ContentActionsApi.Controller
{
    public interface IContentActionApiController<T> : IContentActionApiController where T : IContentData
    {

    }

    public interface IContentActionApiController
    {
        Type ContentType { get; }
    }
}
