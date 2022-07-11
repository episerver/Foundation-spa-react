# Foundation Spa React - Frontend


## Getting Started
First configure the environment, by creating a `.env.local` file in the frontend root folder, with the following contents:

```env
# Optimizely Content Cloud
OPTIMIZELY_DXP_URL=http://localhost:8000/
OPTIMIZELY_DXP_DEBUG=0
OPTIMIZELY_DXP_SITE_ID=9881c5ff-4f21-428e-85a3-2c68f525c3b1
OPTIMIZELY_DXP_CLIENT_ID=cli
OPTIMIZELY_DXP_CLIENT_KEY=cli
OPTIMIZELY_DXP_WEB_CLIENT_ID=frontend
OPTIMIZELY_DXP_WEB_CLIENT_KEY=

# Optimizely Project GraphQL
OPTIMIZELY_GQL_DOMAIN=optimizely.gq
OPTIMIZELY_GQL_TOKEN=** YOUR TOKEN HERE **

# Optimizely Data Platform
NEXT_PUBLIC_OPTIMIZELY_DATA_PLATFORM_BROWSER_ID=W4WzcEs-ABgXorzY7h1LCQ

# NextAuth.JS
NEXTAUTH_SECRET=1234567879abcdefghijklmnopqrstuvwxyz
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
```

Secondly, check connectivity with Content Cloud and list the currently avaialble
websites, by using the included CLI tool: `npx opti-cms website list`. Take the
ID of the website and use that to update the value of `OPTIMIZELY_DXP_SITE_ID`
to ensure the build will succeed.

Thirdly, update the bindings to the website, so available languages and settings
will be correctly reflected in the website. This is done using the included CLI
tool: `npx opti-cms website export`.

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Synchronizing schema

## Building
The site can be built using the standard Next.JS command `npm run build`, to
start the building process. After the build has completed `npx next start` will
start the production server.