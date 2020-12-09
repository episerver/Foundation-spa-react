﻿using System;
using System.ComponentModel.DataAnnotations;
using EPiServer.Core;
using EPiServer.DataAbstraction;
using EPiServer.DataAnnotations;
using EPiServer.Framework.Blobs;
using EPiServer.Framework.DataAnnotations;
using EPiServer.ServiceLocation;
using EPiServer.Web;
using EPiServer.Web.Routing;

namespace Foundation.SpaViewEngine.SpaContainer
{
    [ContentType(
        DisplayName = "Spa Media Container",
        GUID = "3ce3288f-ebf0-4130-addb-37683742230d",
        Description = "Storage container for single-page application deployment & delivery.",
        GroupName = "Single Page Application"
        , AvailableInEditMode = false)]
    [MediaDescriptor(ExtensionString = "spa")]
    [AvailableContentTypes(
        Availability = Availability.Specific,
        IncludeOn = new[] { typeof(SpaFolder) })]
    public class SpaMedia : MediaData
    {
        
    }
}