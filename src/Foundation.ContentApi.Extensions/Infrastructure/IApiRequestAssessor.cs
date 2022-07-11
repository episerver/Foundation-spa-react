using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.ContentApi.Extensions.Infrastructure
{
    /// <summary>
    /// Service definition for the IApiRequestAssessor, which is used by the UniversalContextModeResolver
    /// to resolve the context for any request.
    /// </summary>
    public interface IApiRequestAssessor
    {
        public bool IsApiUri(Uri requestUri);
    }
}
