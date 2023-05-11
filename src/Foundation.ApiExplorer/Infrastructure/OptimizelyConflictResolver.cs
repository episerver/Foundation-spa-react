using Microsoft.AspNetCore.Mvc.ApiExplorer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Foundation.ApiExplorer.Infrastructure
{
    internal static class OptimizelyConflictResolver
    {
        public static ApiDescription Resolve(IEnumerable<ApiDescription> descriptions)
        {
            return 
                descriptions
                    .Where(x => x.SupportedRequestFormats.Any(y => string.Equals(y.MediaType, "application/json", StringComparison.OrdinalIgnoreCase))).First();
        }
    }
}
