using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Internal;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.Core;
using System;

namespace Foundation.Settings.Extensions
{
    public static class ContentConvertingServiceExtensions
    {
        /// <summary>
        /// Wrapper for the ContentConvertingService.Convert function, which adds error handling into the mix
        /// </summary>
        /// <param name="converter"></param>
        /// <param name="content"></param>
        /// <param name="context"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        public static bool TryConvert(this ContentConvertingService converter, IContent content, ConverterContext? context, out IContentApiModel? model)
        {
            model = default;
            try
            {
                model = converter.Convert(content, context);
                return true;
            } catch (Exception)
            {
                return false;
            }
        }
    }
}
