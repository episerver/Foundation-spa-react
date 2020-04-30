RemkoJ.Foundation.ContentDeliveryAPI
---
This Add-On for Episerver adds the following capabilities:

* Edit mode support for Content & Commerce items through an SPA
* Access to business logic in controllers by exposing the following URLs
  * /\{content_url\}/\{controller_method\}
  * /api/episerver/v3/action/\{contentGuid}/{controller_method\}
  * /api/episerver/v3/action/\{contentId}/{controller_method\}

The response is serialized through Newtonsoft.Json, using the serializers 
of the ContentDeliveryAPI for IContent objects.