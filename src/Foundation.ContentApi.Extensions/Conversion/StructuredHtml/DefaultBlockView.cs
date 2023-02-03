using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.ServiceLocation;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.ContentApi.Extensions.Conversion.StructuredHtml
{
    internal class DefaultBlockView : IView
    {
        public static readonly string DefaultPath = "/ContentApi/StructuredHtml/BlockComponent";

        private readonly Injected<ContentTypeRepository> _contentTypeRepository;

        public string Path => DefaultPath;

        public Task RenderAsync(ViewContext context)
        {
            var id = string.Empty;
            var guid = Guid.Empty;
            var label = string.Empty;
            var type = string.Empty;
            if (context.ViewData.Model is IContent iContent) {
                id = WebUtility.HtmlEncode(iContent.ContentLink.ID.ToString());
                guid = iContent.ContentGuid;
                label = WebUtility.HtmlEncode(iContent.Name);

                var contentType = _contentTypeRepository.Service.Load(iContent.ContentTypeID);
                type = WebUtility.HtmlEncode($"{contentType.Base}/{contentType.Name}");
            }
            try
            {
                context.Writer.Write($"<section data-type=\"opti-content\" data-id=\"{ id }\" data-guid=\"{ guid }\" data-type=\"{ type }\" style=\"display: none;\">{ label }</section>");
            } catch (Exception)
            {

            }

            return Task.CompletedTask;
        }
    }
}
