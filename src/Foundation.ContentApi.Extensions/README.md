# Foundation ContentApi Extensions
This project extends the default ContentDeliveryAPI, provided by OptimizelyCMS
with a number of convenience capabilities that greatly simplify the usage of
the ContentDeliveryAPI in conjunction with a decoupled frontend.

### Enhancements
- Allow loading of the common draft version by adding `X-PreviewMode` header,
  with one of two possible values: `edit` or `preview`. This correspond to the
  context mode resolved by the CMS, and thus may trigger specific extensions 
  that depend on the correct resolution of the ContextMode.

- Allow loading of the common draft version by adding `epieditmode` query 
  string parameter, with the values: `true`. This will set the ContextMode
  withing the CMS to `ContextMode.Edit`.

- Allow loading specific versions by providing a ContentLink that consists of
  both a ContentID and WorkID (e.g. 7_383). The API will only load a specific
  version if the currently authenticated user has "Edit" rights on the content.

## Enabling the enhancements
Add the following to your startup:
```c#
public void ConfigureServices(IServiceCollection services)
{
    // ... Existing logic ...

    // Add APIs to Application
    var authenticationScheme = OpenIDConnectOptionsDefaults.AuthenticationScheme;
    services
        .AddContentDeliveryApi( 
            authenticationScheme, 
            options => {
                options.SiteDefinitionApiEnabled = true;
            }
        )
        // .WithFriendlyUrl() // Only if running Hybrid Headless
        .WithSiteBasedCors();
    services.ConfigureForExternalTemplates();

    // Enable extensions
    services.ApplyContentApiExtensions( authenticationScheme );

    // ... Existing logic ...
}

```