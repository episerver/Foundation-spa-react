using EPiServer;
using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using Foundation.ContentDelivery.Models.Api;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Foundation.ContentDelivery.Models
{
    /// <summary>
    /// An IContentModelReferenceConverter implementation, which generates instances of 
    /// TypedContentModelReference instead of ContentModelReference to ensure that the
    /// ContentType is added to a ContentModelReference.
    /// 
    /// This implementation is designed as a wrapper for the default service, so it can
    /// be injected through an interceptor.
    /// </summary>
    /// <see cref="TypedContentModelReference"/>
    public class TypedContentModelReferenceConverter : IContentModelReferenceConverter
    {
        protected readonly IContentTypeRepository _contentTypeRepository;
        protected readonly IContentLoader _contentLoader;
        public IContentModelReferenceConverter Base { get; }

        public TypedContentModelReferenceConverter(IContentModelReferenceConverter baseConverter, IContentTypeRepository contentTypeRepository, IContentLoader contentLoader)
        {
            Base = baseConverter;
            _contentTypeRepository = contentTypeRepository;
            _contentLoader = contentLoader;
        }

        public ContentModelReference GetContentModelReference(IContent content)
        {
            var model = TypedContentModelReference.CreateFromBase(Base.GetContentModelReference(content));
            model.ContentType = GetAllContentTypes(content);
            return model;
        }

        public ContentModelReference GetContentModelReference(ContentReference contentReference)
        {
            var model = TypedContentModelReference.CreateFromBase(Base.GetContentModelReference(contentReference));
            var content = _contentLoader.Get<IContent>(contentReference);
            if (contentReference != null && content != null)
                model.ContentType = GetAllContentTypes(content);
            return model;
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
