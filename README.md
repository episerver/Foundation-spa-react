> [!WARNING]
> This example is intended for demonstration purposes only and is not supported for production applications in Optimizely's Content and Commerce Cloud. The approach launches a NodeJS server and proxies requests to a frontend application, which can result in performance and stability issues.

# Foundation Spa React <!-- omit in toc -->

:warning: There is no backwards code compatibility between the "old" CMS 11 version and the new CMS 12 version.

This is an example project showing a decoupled backend (Optimizely Content Cloud) and frontend (Next.JS), which retains the editor experience and capability of a "traditional" Optimizely Content Cloud implementation.

- [1. Running locally](#1-running-locally)
  - [1.1. Prerequisites](#11-prerequisites)
  - [1.2. Installing the environments](#12-installing-the-environments)
  - [1.3. Starting the backend](#13-starting-the-backend)
  - [1.4. Starting the frontend](#14-starting-the-frontend)
- [2. Deploying](#2-deploying)

## 1. Running locally
### 1.1. Prerequisites
Please make sure that the following tools are installed:
- [CMS 12 Development environment](https://world.optimizely.com/documentation/developer-guides/CMS/getting-started/set-up-a-development-environment/)
- [Node.JS Latest LTS (16+)*](https://nodejs.org/en/download/)
- [NPM 9+](https://docs.npmjs.com/try-the-latest-stable-version-of-npm)
- [Visual Studio Code (Recommended)](https://code.visualstudio.com/)

*Note:* Please refrain from using native module support (Node-Gyp) or ensure it's working correctly and able to build native modules.

### 1.2. Installing the environments
To successfully install the two applications, you need to go through these steps:
1. Install the CMS, by following the instructions in the [backend docs](src/Headless.Cms/README.md).
2. Start the CMS and make sure it's running (typically at http://localhost:8000).
  
   *If you have the CMS running at a different domain/port, you must manually adjust the instructions in the next steps.*

3. Install the frontend, by following the instructions in the [frontend docs](src/frontend/README.md).

### 1.3. Starting the backend
The backend leverages the built-in OIDC server to perform authentication, which requires encryption of the messages between server and client. If - and only if - the environment resolves to a development environment the built-in development certificates are used.

Details: [Backend docs](src/Headless.Cms/README.md)

***Warning***: After the initial installation & configuration you MUST perform a number of configuration steps to make the included content-pack and features operational. These are detailed in the Backend Docs linked above.

### 1.4. Starting the frontend

Details: [Frontend docs](src/frontend/README.md)

## 2. Deploying
Both applications do not have special components and can be deployed to hosting environments for their respective tech-stack.

The "tools" folder contains an example script allowing you to build the Headless.Cms project and deploy it into DXP. [Example script](tools/dxp-deploy.ps1)
