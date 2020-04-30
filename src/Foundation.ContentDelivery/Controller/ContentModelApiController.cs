using System.Collections.Generic;
using System.Web.Routing;
using System.Web.Http;
using EPiServer.DataAbstraction;
using EPiServer.ContentApi.Core.Security.Internal;
using Foundation.ContentDelivery.Models.Responses;

namespace Foundation.ContentDelivery.Controller
{
    /// <summary>
    /// Model controller allowing access to the IContent types stored within the Episerver instance.
    /// </summary>
    [RoutePrefix("api/episerver/v3/model")]
    [ContentApiAuthorization]
    [ContentApiCors]
    [CorsOptionsActionFilter]
    public class ContentModelApiController : ApiController
    {
        private readonly IContentTypeRepository _contentTypeRepository;

        public ContentModelApiController(IContentTypeRepository contentTypeRepository)
        {
            _contentTypeRepository = contentTypeRepository;
        }

        [Route("")]
        [HttpGet]
        public IHttpActionResult GetList() 
        {
            var models  = new List<BasicContentTypeData>();
            foreach (var type in _contentTypeRepository.List())
            {
                models.Add(new BasicContentTypeData
                {
                    GUID = type.GUID,
                    Name = type.Name,
                    DisplayName = type.DisplayName,
                    Description = type.Description
                });
            }
            return Ok(models);
        }

        [Route("{modelName}")]
        [HttpGet]
        public IHttpActionResult GetModel(string modelName)
        {
            var model = _contentTypeRepository.Load(modelName);
            if (model == null)
            {
                return NotFound();
            }

            var output = new FullContentTypeData
            {
                GUID = model.GUID,
                Name = model.Name,
                DisplayName = model.DisplayName,
                Description = model.Description
            };

            foreach (var property in model.PropertyDefinitions)
            {

                string defaultValueType;
                switch (property.DefaultValueType)
                {
                    case DefaultValueType.Inherit:
                        defaultValueType = "Inherit";
                        break;
                    case DefaultValueType.Value:
                        defaultValueType = "Value";
                        break;
                    default:
                        defaultValueType = "None";
                        break;
                }
                output.Properties.Add(new ContentTypePropertyData
                {
                    Name = property.Name,
                    DisplayName = property.EditCaption,
                    Description = property.HelpText,
                    Type = property.Type.Name,
                    DefaultValue = property.DefaultValue,
                    DefaultValueType = defaultValueType
                });
            }

            return Ok(output);
        }
    }
}
