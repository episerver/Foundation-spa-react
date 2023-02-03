# Foundation Headless CMS <!-- omit in toc -->
This is an example of a CMS Build, capable of running the demo content of Foundation MVC CMS, for a decoupled headless build.

- [1. Local development installation](#1-local-development-installation)
  - [1.1. Prerequisites](#11-prerequisites)
  - [1.2. Installation](#12-installation)
  - [1.3. Service configuration](#13-service-configuration)
- [2. Initial schema \& content](#2-initial-schema--content)
  - [2.1. Configure user accounts](#21-configure-user-accounts)
  - [2.2. Configure Websites](#22-configure-websites)
- [3. OpenID Connect](#3-openid-connect)
  - [3.1. Prepare certificates](#31-prepare-certificates)
  - [3.2. Applications](#32-applications)
- [4. Fontend integration](#4-fontend-integration)
- [5. Common problems](#5-common-problems)

## 1. Local development installation
### 1.1. Prerequisites
In order to run a local development installation, your environment needs to meet the general development requirements, as well as have some additional tools available.

- [Setting up a development environment (Optimizely World)](https://world.optimizely.com/documentation/developer-guides/CMS/getting-started/set-up-a-development-environment/)

### 1.2. Installation

After checkout, open a terminal, navigate to the headless-cms folder and run the following commands to create the database and admin user:

```
dotnet-episerver create-cms-database .\Headless.Cms.csproj -S localhost -dn FoundationHeadlessCms -E

dotnet-episerver add-admin-user .\Headless.Cms.csproj -u [username] -e [email] -p [password] -c EPiServerDB
```

### 1.3. Service configuration
The CMS implementation leverages both Search & Navigation as well as Project GraphQL, make sure that these services are configured within the appsettings.json. The configuration structure is already in place, make sure to replace the values with your accounts.

```json
"EPiServer": {
    "Find": {
      "DefaultIndex": "index_name",
      "ServiceUrl": "https://example.com/index_token/",
      "TrackingSanitizerEnabled": true,
      "TrackingTimeout": 30000
    }
  },
  "Optimizely": {
    "Query": {
      "GatewayAddress": "https://example.com/change-me",
      "AppKey": "Y2hhbmdlLW1l",
      "Secret": "Y2hhbmdlLW1l",
      "SingleKey": "Y2hhbmdlLW1l",
      "AllowSendingLog": "true"
    }
  },
```

Make sure that the URLs in your appsettings.json are correct, the API Explorer uses the first URL from the appsettings to connect to. So all "typical" browser restrictions on connecting to this URL apply. (*i.e. Ensure that any https url is first in the list*)

**Obtaining accounts:**
* Search and Navigation: https://find.episerver.com/
* Content Graph: https://docs.developers.optimizely.com/digital-experience-platform/v1.4.0-content-graph/docs/project-graphql

## 2. Initial schema & content
During the first page load, the site will check if there's a website with the name "Foundation Headless", if it is present it will skip loading the initial content.

The default website name can be overridden using either appSettings.json or environment variables (appSettings takes precendence). The domains of the website will be taken from the request that triggers the import. The import uses the following files

| File | Usage |
| --- | --- |
| App_Data/foundation.contentmanifest.json | The content schema, in the format of the ContentDefinitionsAPI |
| App_Data/foundation.episerverdata | The EpiserverData file containing the site contents |
| | |

***Note:*** When there is an error during the first time the site is started, the import will either fail or not start. Look at the common problems below to trigger the import manually.

### 2.1. Configure user accounts
The included content structure and data files do require you to take a few steps after initially starting the CMS. These are:

1. Verify that the user group `Administrators` has been created, and create it when it hasn't been.
2. Verify that the user group `WebEditors` has been created, and create it when it hasn't been.
3. Verify that the user you've created in step [1.2. Installation](#12-installation) has been added to the groups `Administrators` and `WebEditors`, assign the user manually if it hasn't been

### 2.2. Configure Websites
By default, the installation only adds the CMS domain to the website definition. Depending on your setup you may need to alter the domain configuration:

1. When running the frontend through the included proxy, everything is good to go.
2. When running the frontend on a separate domain/port, you need to make the following changes in the "hosts" list:
   - Change the CMS domain, remove the type and set the correct scheme
   - Add the CMS HTTP domain (for example localhost:8000), if this exists, with schema correctly set
   - Add a the frontend domain, with schema correctly set and assign the "Primary" flag to it
   - Set the CMS domain that matches in schema with the frontend to type "Edit"

## 3. OpenID Connect
To allow a shared/single sign-on between the frontend and backend, this solution leverages the Optimizely OIDC service. 

- When running in development mode, no certificates are required
- When running in any other mode, you must configure the certificates to be used to encrypt the sign-on flow

### 3.1. Prepare certificates
To ensure properly encrypted and secure communications using OpenID Connect, you may configure specific certificates to be used for OpenID Connect. Eventhough the application comes with a set of certificate files to be used, it is highly recommended to replace them with your own certificates.

When any of the certificates cannot be found and/or loaded from disk the site will revert back to using development certificates and show an error in the logging.

```js
{
  "Foundation": {
    "Certificates": {
      "SigningCertificate": "my.pfx", /* [OPTIONAL] The name of the signing certificate file, "my.pfx" if not provided. */
      "SigningCertificatePassPhrase": "Headless.CMS",/* [OPTIONAL] The passphrase for the certificate; "Headless.CMS" if not provided. */
      "EncryptionCertificate": "my.pfx", /* [OPTIONAL] The name of the encryption certificate file, "my.pfx" if not provided. */
      "EncryptionCertificatePassPhrase": "Headless.CMS",/* [OPTIONAL] The passphrase for the certificate; "Headless.CMS" if not provided. */
      "Directory": "certificates", /* [OPTIONAL] The path inside App_Data where the certificate files are stored. */
      "UseDevelopmentCertificate": false /* [OPTIONAL] Allows the usage of .Net generated development certificates. */
    }
  }
```

Make sure to restart the application after changing the certificate files and/or configuration

### 3.2. Applications
Add the following OIDC Applications through the UI to support both the bundled API explorer and the decoupled frontend:

1. Add an OpenID Connect client for the API Explorer
   - *Type*: `Confidential`
   - *ClientId*: `ApiExplorer`
   - *ClientSecret*: **[Your client secret]**
   - *Redirect URLs*: `[edit domain]/swagger/oauth2-redirect.html` (example: `https://localhost:8001/swagger/oauth2-redirect.html`)
   - *Post logout redirect URLs*: `[edit domain]/swagger` (example: `https://localhost:8001/swagger`)
   - *Scopes*:
     - openid
     - offline_access
     - profile
     - email
     - roles
     - epi_content_delivery
     - epi_content_management
     - epi_content_definitions

2. Add an OpenID Connect client for the Website (Assuming you're using the bundled frontend)
   - *Type*: `Public`
   - *ClientId*: `frontend`
   - *Redirect URLs*: `[site domain]/api/auth/callback/opticms12` (example: `http://localhost:3000/api/auth/callback/opticms12`)
   - *Post logout redirect URLs*: `[site domain]` (example: `http://localhost:3000`)
   - *Scopes*:
     - openid
     - offline_access
     - profile
     - email
     - roles
     - epi_content_delivery
     - epi_content_management
     - epi_content_definitions

3. Add an OpenID Connect client for the Command line tool (Assuming you're using the bundled frontend)
   - *Type*: `Confidential`
   - *ClientId*: `cli`
   - *ClientSecret*: `cli`
   - *Redirect URLs*: `http://localhost:64321/`
   - *Post logout redirect URLs*: `http://localhost:64321/`
   - *Scopes*:
     - openid
     - offline_access
     - profile
     - email
     - roles
     - epi_content_delivery
     - epi_content_management
     - epi_content_definitions

## 4. Fontend integration
The Headless.CMS project contains the logic to run a JavaScript based frontend as child process of the .Net webserver. This logic contains two basic components: a process manager and a reverse proxy. These are configured by the following section in the appSettings.json:

```js
{
  "NodeJsMiddleware": {
    "Disabled": "false", // [OPTIONAL] Master switch, set to "true" to disable the logic completely
    "ScriptName": "dotnet.js", // [OPTIONAL] The javascript file, which must be executed (and lives within the FrontendPath) to start the frontend
    "ProxyTimeout": 10, // [OPTIONAL] The number of seconds to wait for a response from the frontend
    "StartupTimeout": 1, // [OPTIONAL] The number of minutes to wait for the frontend to start, before throwing an exception
    "AutoStart": "true", // [OPTIONAL] Set to "false" to not start the Node.JS process, but throw an error when it's not running. This is typically used within development environments.
    "AutoRestart": "true", // [OPTIONAL] Set to "false" to not restart the Node.JS process when it dies, but throw an error when it's not running. This is typically used within development environments.
    "FrontendPath": "./frontend", // The relative path to the frontend, from the .Net backend
    "UseHttps": "false", // [OPTIONAL] Set to true to use an internal HTTPS connection to the frontend.
    "Host": "localhost" // [OPTIONAL] The host at which the frontend is/will be available
    "Port": 3080 // [OPTIONAL] The network port at which the frontend is/will be listening
  }
}
```

## 5. Common problems
These are commonly reported problems:

|Problem|Resolution|
|-|-|
| After the initial startup there is no site content nor are there any content types | Within the CMS switch from the CMS context to the Api Explorer context. Here you can find an "Initialize instance" api. You need to use this API, either from the 'try it out' button, or your favorite API Client. <br/> 1. Invoke the service with the body: `{ "importSchema": true }`, wait for it to import the content-types. <br/>2. Invoke the services with the body: `{ "importData": true }`, wait for it complete the site import.<br/><br/>*Note:* This will overwrite / destroy an existing data in the CMS, so do not use this service unless the CMS is empty.|
