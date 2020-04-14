using Castle.DynamicProxy;
using EPiServer.ContentApi.Core;
using EPiServer.ContentApi.Core.Internal;
using EPiServer.ContentApi.Core.Security.Internal;
using EPiServer.Core;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using Foundation.ContentDeliveryApi.Models;
using Foundation.ContentDeliveryApi.Models.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.ValueProviders;
using System.Web.Routing;
using MvcActionResult = System.Web.Mvc.ActionResult;
using MvcController = System.Web.Mvc.Controller;
using MvcControllerContext = System.Web.Mvc.ControllerContext;

namespace Foundation.ContentDeliveryApi.Controller
{
    [RoutePrefix("api/episerver/v3/action")]
    [ContentApiAuthorization]
    [ContentApiCors]
    [CorsOptionsActionFilter]
    public class ControllerActionApiController : ApiController
    {
        protected readonly ContentLoaderService _contentLoader;
        protected readonly ITemplateResolver _templateResolver;
        protected readonly UrlResolverService _urlResolverService;
        protected IServiceLocator ServiceLocator
        {
            get
            {
                return EPiServer.ServiceLocation.ServiceLocator.Current;
            }
        }

        public ControllerActionApiController(
            ContentLoaderService contentLoaderService,
            ITemplateResolver templateResolver,
            UrlResolverService urlResolverService
        )
        {
            _contentLoader = contentLoaderService;
            _templateResolver = templateResolver;
            _urlResolverService = urlResolverService;
        }

        [Route("{contentGuid:guid}")]
        [HttpGet]
        [HttpPost]
        public async Task<IHttpActionResult> GetContent(
            Guid contentGuid,
            [ValueProvider(typeof(AcceptLanguageHeaderValueProviderFactory))] List<string> languages)
        {
            return await GetContent(contentGuid, "index", languages);
        }

        [Route("{contentReference}")]
        [HttpGet]
        [HttpPost]
        public async Task<IHttpActionResult> GetContent(
            int contentReference,
            [ValueProvider(typeof(AcceptLanguageHeaderValueProviderFactory))] List<string> languages)
        {
            return await GetContent(contentReference, "index", languages);
        }

        [Route("{contentGuid:guid}/{controllerAction}")]
        [HttpGet]
        [HttpPost]
        public async Task<IHttpActionResult> GetContent(
            Guid contentGuid,
            string controllerAction,
            [ValueProvider(typeof(AcceptLanguageHeaderValueProviderFactory))] List<string> languages)
        {
            try
            {
                var language = languages?.FirstOrDefault();
                var contentData = _contentLoader.Get(contentGuid, language);
                return await BuildActionResult(contentData, controllerAction, language);
            }
            catch (Exception ex)
            {
                return new ControllerActionApiResult<ExceptionResponseData>(new ExceptionResponseData()
                {
                    ErrorMessage = ex.Message,
                    Exception = ex
                }, HttpStatusCode.InternalServerError);
            }
        }

        [Route("{contentReference}/{controllerAction}")]
        [HttpGet]
        [HttpPost]
        public async Task<IHttpActionResult> GetContent(
            int contentReference,
            string controllerAction,
            [ValueProvider(typeof(AcceptLanguageHeaderValueProviderFactory))] List<string> languages)
        {
            try
            {
                var reference = new ContentReference(contentReference);
                var language = languages?.FirstOrDefault();
                var contentData = _contentLoader.Get(reference, language);
                return await BuildActionResult(contentData, controllerAction, language);
            }
            catch (Exception ex)
            {
                return new ControllerActionApiResult<ExceptionResponseData>(new ExceptionResponseData()
                {
                    ErrorMessage = ex.Message,
                    Exception = ex
                }, HttpStatusCode.InternalServerError);
            }
        }

        /// <summary>
        /// The main logic behind invoking methods on page or block controllers
        /// </summary>
        /// <param name="contentData">The content reference to load the related controller</param>
        /// <param name="controllerAction">The method to invoke</param>
        /// <returns>The action result to be returned to the client</returns>
        protected async Task<IHttpActionResult> BuildActionResult(IContent contentData, string controllerAction, string language)
        {
            var controllerType = GetControllerType(contentData);
            var method = controllerType?.GetMethod(controllerAction, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);

            if (method == null)
            {
                return new ControllerActionApiResult<NotFoundResponseData>(new NotFoundResponseData()
                {
                    ErrorMessage = "Method " + controllerAction + " not found for " + controllerType?.Name
                }, HttpStatusCode.NotFound);
            }

            var controller = (MvcController)ServiceLocator.GetInstance(controllerType);
            InitializeContext(controller);
            var parameters = await CreateParameters(method, contentData, controller.ControllerContext);

            //Execute
            var result = method.Invoke(controller, parameters);

            //Await response if needed
            if (result is Task<MvcActionResult> taskResult)
            {
                result = await taskResult;
            }
            else if (result is Task<System.Web.Mvc.ViewResult> taskViewResult)
            {
                result = await taskViewResult;
            }

            //Transform
            if (result is System.Web.Mvc.HttpStatusCodeResult)
            {
                return new ControllerActionApiResult<string>(((System.Web.Mvc.HttpStatusCodeResult)result).StatusDescription, (HttpStatusCode)((System.Web.Mvc.HttpStatusCodeResult)result).StatusCode);
            }
            var responseData = GetModelFromControllerResult(result, controllerAction, contentData, language);
            return new ControllerActionApiResult<ActionResponseData>(responseData, HttpStatusCode.OK)
            {
                Request = Request
            };
        }

        protected virtual ActionResponseData GetModelFromControllerResult(object result, string actionName, IContent iContent, string language)
        {
            //Prepare response data
            var model = new ActionResponseData()
            {
                ActionName = actionName,
                ContentLink = iContent.ContentLink,
                Name = iContent.Name,
                Url = _urlResolverService.ResolveUrl(iContent.ContentLink, language),
                ResponseObjectType = result.GetType().FullName,
                CurrentContent = iContent,
                Language = language
            };

            //Get data
            if (result is System.Web.Mvc.PartialViewResult)
            {
                model.Data = ((System.Web.Mvc.PartialViewResult)result).Model;
            }
            else if (result is System.Web.Mvc.ViewResult)
            {
                model.Data = ((System.Web.Mvc.ViewResult)result).Model;
            }
            else if (result is System.Web.Mvc.JsonResult)
            {
                model.Data = ((System.Web.Mvc.JsonResult)result).Data;
            }

            //Return model
            return model;
        }

        protected virtual async Task<object[]> CreateParameters(MethodInfo method, IContent content, MvcControllerContext context)
        {
            return await CreateParameters(method, content, context, new Dictionary<string, object>());
        }

        protected virtual async Task<string> GetRequestBody()
        {
            if (Request.Method != System.Net.Http.HttpMethod.Get)
            {
                return await Request.Content.ReadAsStringAsync();
            }
            return "";
        }

        protected virtual async Task<object[]> CreateParameters(MethodInfo method, IContent content, MvcControllerContext context, IDictionary<string, object> keyValuePairs)
        {
            var parameters = new List<object>();
            //Ieks, but gets the job done...
            var allParametersPrimitiveOrContentType = method.GetParameters().All(p => { return p.ParameterType.IsPrimitive || p.ParameterType.FullName == "System.String" || p.ParameterType.IsAssignableFrom(content.GetType()); });
            if (allParametersPrimitiveOrContentType)
            {
                var requestContent = await GetRequestBody();
                var requestData = String.IsNullOrWhiteSpace(requestContent) ?
                    new Dictionary<string, object>() :
                    Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, object>>(requestContent);

                foreach (var info in method.GetParameters())
                {
                    if (info.ParameterType.IsAssignableFrom(content.GetType())) //First check if we need to assign the IContent
                    {
                        parameters.Add(content);
                        continue;
                    }

                    if (requestData.ContainsKey(info.Name))
                    {
                        switch (info.ParameterType.Name)
                        {
                            case "Int32":
                                int intValue;
                                if (Int32.TryParse(requestData[info.Name].ToString(), out intValue))
                                {
                                    parameters.Add(intValue);
                                    continue;
                                }
                                break;
                            case "String":
                                parameters.Add(requestData[info.Name].ToString());
                                continue;
                            case "Int64":
                                long longValue;
                                if (Int64.TryParse(requestData[info.Name].ToString(), out longValue))
                                {
                                    parameters.Add(longValue);
                                    continue;
                                }
                                break;
                        }
                    }

                    if (keyValuePairs.Keys.Contains(info.Name) && info.ParameterType.IsAssignableFrom(keyValuePairs[info.Name].GetType())) //Then check the dictionary
                    {
                        parameters.Add(keyValuePairs[info.Name]);
                        continue;
                    }

                    if (info.HasDefaultValue) //Then use the default value, if available
                    {
                        parameters.Add(info.DefaultValue);
                        continue;
                    }

                    parameters.Add(null);
                }
            }
            else
            {
                foreach (var info in method.GetParameters())
                {
                    if (info.ParameterType.IsAssignableFrom(content.GetType())) //First check if we need to assign the IContent
                    {
                        parameters.Add(content);
                        continue;
                    }

                    var binder = System.Web.Mvc.ModelBinders.Binders.GetBinder(info.ParameterType);
                    if (binder != null) //First try binding
                    {
                        //var modelMetaData = System.Web.Mvc.ModelMetadataProviders.Current.GetMetadataForProperty(null, method.DeclaringType, info.Name);
                        var modelMetaData = System.Web.Mvc.ModelMetadataProviders.Current.GetMetadataForType(null, info.ParameterType);
                        var bindingContext = new System.Web.Mvc.ModelBindingContext
                        {
                            FallbackToEmptyPrefix = true,
                            ModelName = info.ParameterType.FullName,
                            ModelMetadata = modelMetaData,
                            ValueProvider = context.Controller.ValueProvider
                        };
                        parameters.Add(binder.BindModel(context, bindingContext));
                        continue;
                    }

                    if (keyValuePairs.Keys.Contains(info.Name) && info.ParameterType.IsAssignableFrom(keyValuePairs[info.Name].GetType())) //Then check the dictionary
                    {
                        parameters.Add(keyValuePairs[info.Name]);
                        continue;
                    }

                    if (info.HasDefaultValue) //Then use the default value, if available
                    {
                        parameters.Add(info.DefaultValue);
                        continue;
                    }

                    parameters.Add(null);
                }
            }
            return parameters.ToArray();
        }

        /// <summary>
        /// Resolve the System.Type of the controller class associated with a certain IContent object.
        /// </summary>
        /// <param name="content">The IContent to get the controller for</param>
        /// <returns>The System.Type of the controller</returns>
        protected virtual Type GetControllerType(IContent content)
        {
            var contentType = content.GetType();
            var proxy = (content as IProxyTargetAccessor);
            if (proxy != null)
                contentType = content.GetType().BaseType;

            var resolved = _templateResolver.Resolve
            (
                contentType,
                EPiServer.Framework.Web.TemplateTypeCategories.MvcController | EPiServer.Framework.Web.TemplateTypeCategories.MvcPartialController,
                (string)null
            );
            return resolved?.TemplateType;
        }

        /// <summary>
        /// Add the minimal needed context to a controller for it to execute its logic.
        /// </summary>
        /// <param name="controller">The controller to add the context to</param>
        protected virtual void InitializeContext(MvcController controller)
        {
            controller.ControllerContext = new MvcControllerContext(
                new HttpContextWrapper(HttpContext.Current),
                new RouteData()
                {
                    Values = {
                        {
                            nameof (controller),
                             controller.GetType().Name
                        }
                    }
                },
                controller
            );
        }
    }
}
