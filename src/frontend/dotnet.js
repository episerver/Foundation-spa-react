// Node.JS Dependencies
const { Server: HttpServer } = require('node:http')
const { parse } = require('node:url')

process.env.NODE_ENV = 'production'

// Next.JS Dependencies
const next = require('next')

// Configuration
const dev = false // Always run in production mode
const hostname = 'localhost' // We're being proxied, so localhost is just fine
const port = Number.parseInt(process.argv[2]) || 3080 // Pick any user space port, not likely used by any other service

// Initialize
const nextNodeServer = next({ dev, hostname, port }) // Create the server
run(nextNodeServer) // Start the application


/**
 * 
 * @param { import('next/dist/server/next-server').default } app 
 */
function run(app) 
{
    process.stdout.write("Creating frontend application\n")
    const handle = app.getRequestHandler()
    app.prepare().then(async () =>
    {
        // Override configuration
        process.env.NEXTAUTH_URL=process.env.OPTIMIZELY_DXP_URL
        process.env.SITE_URL=process.env.OPTIMIZELY_DXP_URL

        // Create server
        process.stdout.write("Creating HTTP Server\n")
        const server = new HttpServer({ }, async (req, res) => {
            try {
                const reqUrl = new URL(req.url, `http://${req.headers.host}`);
                const parsedUrl = parse(reqUrl.href, true)
                const { query } = parsedUrl
    
                await handle(req, res, parsedUrl, query)
                
            } catch (err) {
                console.error('Error occurred handling', req.url, err)
                res.statusCode = 500
                res.end('internal server error')
            }
        })
        server.on('clientError', e => {
            console.error("Client error", e)
        })
        process.stdout.write(`Opening ${ hostname }:${ port } in ${ dev ? "development" : "production" } mode\n`)
        server.listen(port, hostname, () => {
            process.stdout.write(`Listening on http://${ hostname }:${ port } in ${ dev ? "development" : "production" } mode.\n`)
        })
    });
}