// Read requested NODE_ENV from 2nd argument, defaulting to production
const dev = (process.argv[3] ?? 'prod') == 'dev';
process.env.NODE_ENV = dev ? 'development' : 'production'

// Load dependencies
const { Server: HttpServer } = require('node:http')
const { parse } = require('node:url')
const next = require('next')

// Configuration
const hostname = 'localhost' // We're being proxied, so localhost is just fine
const port = Number.parseInt(process.argv[2]) || 3080 // Pick any user space port, not likely used by any other service

// Start Next.JS
process.stdout.write("Creating frontend application\n")
const app = next({ dev, hostname, port })
app.prepare().then(async () =>
{
    // Set configuration if missing
    if (!process?.env?.NEXTAUTH_URL)
        process.env.NEXTAUTH_URL=process.env.OPTIMIZELY_DXP_URL
    if (!process?.env?.SITE_URL)
        process.env.SITE_URL=process.env.OPTIMIZELY_DXP_URL

    // Create server
    process.stdout.write("Creating HTTP Server\n")
    const server = new HttpServer({ }, app.getRequestHandler())
    server.on('clientError', e => console.error("Client error", e))
    process.stdout.write(`Opening ${ hostname }:${ port } in ${ dev ? "development" : "production" } mode\n`)
    server.listen(port, hostname, () => {
        process.stdout.write(`Listening on http://${ hostname }:${ port } in ${ dev ? "development" : "production" } mode.\n`)
        process.stdout.write(`Communicating with DXP: ${ process.env.OPTIMIZELY_DXP_URL }\n`)
        process.stdout.write(`Next-Auth URL: ${ process.env.NEXTAUTH_URL }\n`)
        process.stdout.write(`Frontend URL: ${ process.env.SITE_URL }\n`)
    })
})