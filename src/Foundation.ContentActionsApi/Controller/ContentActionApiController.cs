using EPiServer.ContentApi.Core.Configuration;
using EPiServer.ContentApi.Core.Serialization;
using EPiServer.ContentApi.Core.Serialization.Internal;
using EPiServer.ContentApi.Core.Serialization.Models;
using EPiServer.Core;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Reflection;
using WebIcontextModeResolver = EPiServer.Web.IContextModeResolver;
using Microsoft.AspNetCore.Http.Extensions;

namespace Foundation.ContentActionsApi.Controller
{

    [Controller]
    public abstract class ContentActionApiController : ContentActionApiController<IContentData>
    {

    }

    [Controller]
    public abstract class ContentActionApiController<T> : ControllerBase, IContentActionApiController<T> where T : IContentData
    {
        public virtual Type ContentType => typeof(T);

        protected readonly ContentActionApiControllerAttribute controllerAttribute;
        protected virtual Injected<ContentApiOptions> ContentApiOptions { get; }
        protected virtual Injected<ContentConvertingService> ContentConvertingService { get; }
        protected virtual Injected<WebIcontextModeResolver> ContextModeResolver { get; }
        protected virtual string Select
        {
            get
            {
                string? select = Request.Query.ContainsKey("select") ? Request.Query["select"] : default;
                return string.IsNullOrEmpty(select) ? string.Empty : select;
            }
        }
        protected virtual string Expand
        {
            get
            {
                string? select = Request.Query.ContainsKey("expand") ? Request.Query["expand"] : default;
                return string.IsNullOrEmpty(select) ? string.Empty : select;
            }
        }

        protected virtual T? CurrentContent 
        { 
            get
            {
                var content = Request.RouteValues["content"];
                return content is T current ? current : default;
            } 
        }

        protected virtual IEnumerable<string> UrlParts
        {
            get
            {
                var slugs = Request.RouteValues["slug"];
                return slugs is IEnumerable<string> urlParts ? urlParts : Array.Empty<string>();
            }
        }

        protected virtual CultureInfo Language
        {
            get
            {
                var lang = Request.RouteValues["language"];
                return lang is CultureInfo info ? info : Request.GetLanguage();
            }
        }

        protected virtual ContextMode ContextMode => ContextModeResolver.Service.CurrentMode;

        /// <summary>
        /// Helper method to convert any IContent to the IContentApiModel that
        /// aligns with the ContentDeliveryAPI. This allows content to be serialized
        /// in a way that aligns with the ContentDeliveryAPI
        /// </summary>
        /// <param name="contentData">The content to be transformed</param>
        /// <param name="select">The fields to be selected, if provided it will override the "select" parameter from the querystring</param>
        /// <param name="expand">The fields to be expanded, if provided it will override the "expand" parameter from the querystring</param>
        /// <param name="personalized">Whether or not personalization should take place when transforming the content</param>
        /// <returns>The transformed content</returns>
        /// <exception cref="Exception">When the IContentData based object does not also inherit from IContent</exception>
        protected IContentApiModel ConvertToApiModel(IContentData contentData, string select = "", string expand = "", bool personalized = false, CultureInfo? language = default)
        {
            CultureInfo lang = language is null ? Language : language;
            select = string.IsNullOrEmpty(select) ? Select : select;
            expand = string.IsNullOrEmpty(expand) ? Expand : expand;
            if (contentData is IContent content)
            {
                var context = new ConverterContext(content.ContentLink, lang, ContentApiOptions.Service, ContextMode, select, expand, !personalized);
                return ContentConvertingService.Service.Convert(content, context);
            }
            throw new Exception("Unable to convert the provided data");
        }

        public ContentActionApiController() {
            if (GetType().GetCustomAttribute<ContentActionApiControllerAttribute>() is ContentActionApiControllerAttribute attribute)
            {
                controllerAttribute = attribute;
                if (!attribute.ContentType.IsAssignableTo(typeof(T)))
                    throw new Exception("The ContentType from the attribute must be assignable to the generic attribute type");
            }
            else
                throw new Exception("Instances of ContentActionApiController must be decorated with [ContentActionApiController]");
        }
    }
}
