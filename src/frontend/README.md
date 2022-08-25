# Foundation Spa React - Frontend

## Prerequisites
Make sure your build/development environment meets the following criteria:
* Node.JS, Latest LTS Version (16+) [Installation](https://nodejs.org/) $^{1}$
* Yarn 3 - [Getting Started](https://yarnpkg.com/getting-started)

## Getting Started
### Step 1: Install dependencies
The frontend leverages Next.JS in conjunction with Yarn 3, so start by installing the dependencies so the frontend can be build and deployed.

Run the command: 
```bash
yarn
```

### Step 2: (Optional) Create symbols for Visual Studio Code 


### Step 3: Configure environment
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

### Step 4: Connect to content cloud & synchronize
Check connectivity with Content Cloud and list the currently avaialble
websites, by using the included CLI tool: 
```bash
npx opti-cms website list
```
Take the ID of the website and use that to update the value of `OPTIMIZELY_DXP_SITE_ID`
to ensure the build will succeed.

To update the bindings to the website, so available languages and settings
will be correctly reflected in the website. This is done using the included CLI
tool: 
```bash
npx opti-cms website export
```

Finally, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Synchronizing schema
The fronted comes with an utility to generate TypeScript definitions of the content types defined within Optimizely Content Cloud. To run the synchronization and generate the `schema.d.ts` and `schema.json` files.

```bash
yarn opti-cms types --wt
```

## Running in production mode
The site can be built using the standard Next.JS command `yarn next build`. After the build has completed `yarn next start` will start the production server.

## Running on Optimizely DXP
Optimizely DXP offers the capability to run a Node.JS process alonside the .Net process to offload certain tasks to Node.JS. To use this capability to run the frontend inside DXP, the `dotnet.js` script provides the Next.JS [custom server](https://nextjs.org/docs/advanced-features/custom-server) required to achieve this. The `dotnet.js` script takes one command-line argument, which is the port number at which to start listening. This allows the .Net side to control the used port and thus prevent collisions when running multiple instances on the same machine.

To run the frontend like it would run on DXP, take the following steps:
1. Create a production build of the frontend `yarn next build`
2. Run the frontend directly with node `node --require=./.pnp.cjs --loader=file:///$pwd/.pnp.loader.mjs dotnet.js` (assuming that `$pwd` points to the current working directory)

## Footnotes
$^{1}$ Node.JS has "native module support" (Node-Gyp), some of the dependencies use this capability to build system specific packages. Either do not install/disable this Native Module Support **or** make sure it is able to perform the needed build steps. 