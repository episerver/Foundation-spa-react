# Spa.Frontend

## Setup instructions
These instructions assume that you have access to a working and correctly configured Optimizely Content Cloud instance.

1. Use the .env.dist to generate the .env file(s) needed for your setup
2. Run ``npm run-script login`` to authenticate for your development environment. 
   - If needed, run ``npx epi-login -e production`` to login to production
3. Run ``npm run-script sync-models`` to generate the TypeScript models for the content types in the configured Optimizely Content Cloud instance, overwriting the current models.

## Running the project
Run ``npm start`` to start a local development server to work on the project. The configuration for this server lives in: ``webpack.dev.config.js``.

**NOTE:** This will only use the frontend build, and does not include server side rendering. There are edge-cases where the frontend build will work fine, but it won't work with server side rendering within Content Cloud (using the Foundation SPA ViewEngine).

## Deploying to Foundation SPA ViewEngine
To deploy to the Foundation SPA ViewEngine (both the frontend and server-side rendering), use the following command:

``npm run-script build``

For a productuion environment - if configured using the appropriate .env files - there's a convenience script available for the deployment.

``npm run-script build:production``

The Foundation SPA ViewEngine keeps track of historic versions of both the frontend and server-side rendering and can be used to roll-back to a previous build.