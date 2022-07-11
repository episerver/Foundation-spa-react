# Foundation Headless CMS <!-- omit in toc -->
This is an example of a CMS Build, capable of running the demo content of Foundation MVC CMS, for a decoupled headless build.

- [1. Local development installation](#1-local-development-installation)
  - [1.1. Prerequisites](#11-prerequisites)
  - [1.2. Installation](#12-installation)
  - [1.3. Service configuration](#13-service-configuration)
- [2. Initial schema & content](#2-initial-schema--content)
  - [2.1. Configure instance](#21-configure-instance)
- [3. OpenID Connect](#3-openid-connect)
  - [3.1. Prepare certificates](#31-prepare-certificates)
  - [3.2. Applications](#32-applications)

## 1. Local development installation
### 1.1. Prerequisites
In order to run a local development installation, your environment needs to meet the general development requirements, as well as have some additional tools available.

- [Setting up a development environment (Optimizely World)](https://world.optimizely.com/documentation/developer-guides/CMS/getting-started/set-up-a-development-environment/)

### 1.2. Installation

After checkout, open a terminal, navigate to the headless-cms folder and run the following commands to create the database and admin user:

```
dotnet-episerver create-cms-database .\HeadlessCms.csproj -S localhost -dn FoundationHeadlessCms -E

dotnet-episerver add-admin-user .\HeadlessCms.csproj -u [username] -e [email] -p [password] -c EPiServerDB
```

*Notice:* By default the created connection string assumes an un-encryped connection to the database. However, by default MsSQL uses encrypted connections. If the last command failed due to connection errors, change the connection string within the appsettings.json. Add `Encrypt=True;TrustServerCertificate=True;` after the generated connection string. (If the generated connection string doesn't end in a `;` add that before `Encrypt=`).

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
* Project GraphQL: Currently in closed alpha - https://world.optimizely.com/documentation/developer-guides/project-graphql/

## 2. Initial schema & content
During the first page load, the site will check if there's a website with the name "Foundation Headless", if it is present it will skip loading the initial content.

The default website name can be overridden using either appSettings.json or environment variables (appSettings takes precendence). The domains of the website will be taken from the request that triggers the import. The import uses the following files

| File | Usage |
| --- | --- |
| App_Data/foundation.contentmanifest.json | The content schema, in the format of the ContentDefinitionsAPI |
| App_Data/foundation.episerverdata | The EpiserverData file containing the site contents |
| | |

### 2.1. Configure instance
The included content structure and data files do require you to take a few steps after initially starting the CMS. These are:

1. Add a new user group called `Administrators`
2. Add a new user group called `WebEditors`
3. Add the user you've created in step [1.2. Installation](#12-installation) to the group `Administrators`

## 3. OpenID Connect
To allow a shared/single sign-on between the frontend and backend, this solution leverages the Optimizely OIDC service. 

- When running in development mode, no certificates are required
- When running in any other mode, you must configure the certificates to be used to encrypt the sign-on flow

### 3.1. Prepare certificates
In order to prevent pollution of the host operating system by loading certificates from disk, the Headless.CMS implementation relies on opening an existing X509Certificate Store on the host machine.

**WINDOWS ONLY:** Make sure that the certificate is available in the "LocalMachine" certificate repository. Best location is the "My" (Personal) certificate store. Make sure that the IIS_IUSR group (or equivalent if you're running outside IIS) has read access to the certificate.

**WINDOWS ONLY:** When you copy the certificate thumbprint from the certificate manager, remove any whitespaces and keep in mind that by default a control char will be copied as first character that should be removed.

```js
{
  "Foundation": {
    "Certificates": {
      "StoreName": /* [OPTIONAL] The name of the store to access, "My" if not provided. */,
      "StoreLocation": /* [OPTIONAL] The location of the store, "LocalMachine" if not provided. */,
      "EncryptionThumbprint": /* Thumbprint of the certificate */,
      "SigningThumbprint": /* Thumbprint of the certificate */
    }
  }
```

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
