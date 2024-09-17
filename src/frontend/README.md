# Foundation Spa React - Frontend <!-- omit in toc -->

> [!WARNING]
> This example is intended for demonstration purposes only and is not supported for production applications in Optimizely's Content and Commerce Cloud. The approach launches a NodeJS server and proxies requests to a frontend application, which can result in performance and stability issues.

## Contents <!-- omit in toc -->
- [1. Prerequisites](#1-prerequisites)
- [2. Getting Started](#2-getting-started)
  - [2.1. Step 1: Install dependencies](#21-step-1-install-dependencies)
  - [2.2. Step 2: (Optional) Create symbols for Visual Studio Code](#22-step-2-optional-create-symbols-for-visual-studio-code)
  - [2.3. Step 3: Configure environment](#23-step-3-configure-environment)
  - [2.4. Step 4: Connect to content cloud \& synchronize](#24-step-4-connect-to-content-cloud--synchronize)
- [3. Synchronizing schema](#3-synchronizing-schema)
- [4. Running in production mode](#4-running-in-production-mode)
- [5. Running on Optimizely DXP](#5-running-on-optimizely-dxp)
- [6. Common error messages](#6-common-error-messages)
  - [6.1. The file "./website.cjs" is not present](#61-the-file-websitecjs-is-not-present)
- [7. Footnotes](#7-footnotes)

## 1. Prerequisites
Make sure your build/development environment meets the following criteria:
* Node.JS, Latest LTS Version (16+) [Installation](https://nodejs.org/) $^{1}$
* Yarn 3 - [Getting Started](https://yarnpkg.com/getting-started)

## 2. Getting Started
### 2.1. Step 1: Install dependencies
The frontend leverages Next.JS in conjunction with Yarn 3, so start by installing the dependencies so the frontend can be build and deployed.

Run the command: 
```bash
yarn
```

### 2.2. Step 2: (Optional) Create symbols for Visual Studio Code 
To ensure that the frontend can be deployed to Optimizely DXP, it does not use the traditional `node_modules` folder. Instead the frontend release on yarn pnp to create and maintain the local copy of the used packages. This approach is not compatible with Visual Studio Code, unless it is configured for it.

Documentation on how to perform this configuration can be found at: https://yarnpkg.com/getting-started/editor-sdks#vscode

### 2.3. Step 3: Configure environment
Configure the environment, by creating a `.env.local` file in the frontend root folder, with the following contents:

```env
# Optimizely Content Cloud
OPTIMIZELY_DXP_URL=http://localhost:8000/
OPTIMIZELY_DXP_DEBUG=0
OPTIMIZELY_DXP_SITE_ID=9881c5ff-4f21-428e-85a3-2c68f525c3b1
OPTIMIZELY_DXP_CLIENT_ID=cli
OPTIMIZELY_DXP_CLIENT_KEY=cli
OPTIMIZELY_DXP_WEB_CLIENT_ID=frontend
OPTIMIZELY_DXP_WEB_CLIENT_KEY=

# NextAuth.JS
NEXTAUTH_SECRET=1234567879abcdefghijklmnopqrstuvwxyz
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
```

**Environment variables explained:**
| Variable | Purpose |
| - | - |
| OPTIMIZELY_DXP_URL | The URL Used to be used to connect to the Optimizely DXP |
| OPTIMIZELY_DXP_DEBUG | Set to `1` or `true` to enable debug output of the included @optimizely\\* packages |
| OPTIMIZELY_DXP_SITE_ID | The GUID of the website, as used by the `opti-cms` CLI tool. |
| OPTIMIZELY_DXP_CLIENT_ID | The OIDC Client ID to be used when connecting to the Optimizely DXP |
| OPTIMIZELY_DXP_CLIENT_KEY | The OIDC Client Key to be used when connecting to the Optimizely DXP |
| OPTIMIZELY_DXP_WEB_CLIENT_ID | If set, it overrides the OIDC Client ID to be used when connecting to the Optimizely DXP from the website |
| OPTIMIZELY_DXP_WEB_CLIENT_KEY | If set, it overrides the OIDC Client Key to be used when connecting to the Optimizely DXP from the website |

Environment variables used by included libraries:
- NextAuth.js: [https://next-auth.js.org/configuration/options](https://next-auth.js.org/configuration/options#environment-variables)

### 2.4. Step 4: Connect to content cloud & synchronize
Check connectivity with Content Cloud and list the currently avaialble
websites, by using the included CLI tool: 
```bash
yarn opti-cms website list
```
Take the ID of the website and use that to update the value of `OPTIMIZELY_DXP_SITE_ID`
to ensure the build will succeed.

To update the bindings to the website, so available languages and settings
will be correctly reflected in the website. This is done using the included CLI
tool: 
```bash
yarn opti-cms website export
```

Finally, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 3. Synchronizing schema
The fronted comes with an utility to generate TypeScript definitions of the content types defined within Optimizely Content Cloud. To run the synchronization and generate the `schema.d.ts` and `schema.json` files.

The schema files for the demo content bundled with FoundationSpaReact are included in this repository, so it is not required to 

```bash
yarn opti-cms types --wt
```

## 4. Running in production mode
The site can be built using the standard Next.JS command `yarn next build`. After the build has completed `yarn next start` will start the production server.

## 5. Running on Optimizely DXP
Optimizely DXP offers the capability to run a Node.JS process alonside the .Net process to offload certain tasks to Node.JS. To use this capability to run the frontend inside DXP, the `dotnet.js` script provides the Next.JS [custom server](https://nextjs.org/docs/advanced-features/custom-server) required to achieve this. The `dotnet.js` script takes one command-line argument, which is the port number at which to start listening. This allows the .Net side to control the used port and thus prevent collisions when running multiple instances on the same machine.

To run the frontend like it would run on DXP, take the following steps:
1. Create a production build of the frontend `yarn next build`
2. Run the frontend directly with node `node --require=./.pnp.cjs --loader=file:///$pwd/.pnp.loader.mjs dotnet.js 3030` (assuming that `$pwd` points to the current working directory)

## 6. Common error messages
### 6.1. The file "./website.cjs" is not present
This file should be generated by the steps highlighted in [section 2.4](#24-step-4-connect-to-content-cloud--synchronize), please report a bug if you've completed the configuration steps and are unable to generate a website definition file. The most common reason for failing is an incorrect website GUID for the `OPTIMIZELY_DXP_SITE_ID` environment variable.

## 7. Footnotes
$^{1}$ Node.JS has "native module support" (Node-Gyp), some of the dependencies use this capability to build system specific packages. Either do not install/disable this Native Module Support **or** make sure it is able to perform the needed build steps. 