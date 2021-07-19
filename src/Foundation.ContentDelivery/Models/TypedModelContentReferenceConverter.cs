using EPiServer;
using EPiServer.ContentApi.Core;
using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using Foundation.ContentDelivery.Models.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foundation.ContentDelivery.Models
{
    [ServiceConfiguration(typeof(IContentModelReferenceConverter), Lifecycle = ServiceInstanceScope.Singleton)]
    public class TypedModelContentReferenceConverter : IContentModelReferenceConverter
    {
        protected readonly IPermanentLinkMapper _linkMapper;
        protected readonly UrlResolverService _urlResolverService;
        protected readonly IContentTypeRepository _contentTypeRepository;
        protected readonly IContentLoader _contentLoader;

        public TypedModelContentReferenceConverter(IPermanentLinkMapper linkMapper, UrlResolverService urlResolverService, IContentTypeRepository contentTypeRepository, IContentLoader contentLoader)
        {
            _linkMapper = linkMapper;
            _urlResolverService = urlResolverService;
            _contentTypeRepository = contentTypeRepository;
            _contentLoader = contentLoader;
        }

        public ContentModelReference GetContentModelReference(IContent content)
        {
            if (content == null)
                return null;
            ILocalizable localizable = content as ILocalizable;
            return new TypedContentModelReference()
            {
                Id = content.ContentLink?.ID,
                GuidValue = new Guid?(content.ContentGuid),
                WorkId = content.ContentLink?.WorkID,
                ProviderName = content.ContentLink?.ProviderName,
                Url = _urlResolverService.ResolveUrl(content.ContentLink, localizable?.Language?.Name),
                ContentType = GetAllContentTypes(content)
            };
        }
        public ContentModelReference GetContentModelReference(ContentReference contentReference)
        {
            if (contentReference == null)
                return null;

            var content = _contentLoader.Get<IContent>(contentReference);

            return new TypedContentModelReference()
            {
                Id = new int?(contentReference.ID),
                GuidValue = _linkMapper.Find(contentReference)?.Guid,
                WorkId = new int?(contentReference.WorkID),
                ProviderName = contentReference.ProviderName,
                Url = _urlResolverService.ResolveUrl(contentReference, null),
                ContentType = GetAllContentTypes(content)
            };
        }

        protected virtual List<string> GetAllContentTypes(IContent content)
        {
            List<string> source = new List<string>();
            ContentType contentTypeById = GetContentTypeById(content.ContentTypeID);
            if (contentTypeById.Base != ContentTypeBase.Undefined)
                source.Add(contentTypeById.Base.ToString());
            switch (content)
            {
                case BlockData _:
                    source.Add("Block");
                    break;
                case PageData _:
                    source.Add("Page");
                    break;
                case MediaData _:
                    source.Add("Media");
                    switch (content)
                    {
                        case VideoData _:
                            source.Add("Video");
                            break;
                        case ImageData _:
                            source.Add("Image");
                            break;
                    }
                    break;
            }
            source.Add(contentTypeById.Name);
            return source.Distinct().ToList();
        }

        /// <summary>Get content type by id</summary>
        protected virtual ContentType GetContentTypeById(int contentTypeId)
        {
            ContentType contentType = _contentTypeRepository.Load(contentTypeId);
            return !(contentType == null) ? contentType : throw new Exception(string.Format("Content Type id {0} not found.", contentTypeId));
        }

    }
}
