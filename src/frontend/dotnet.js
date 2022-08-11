const { Server: HttpServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = false // Always run in production mode
const hostname = 'localhost' // We're being proxied, so localhost is just fine
const port = Number.parseInt(process.argv[2]) || 3080 // Pick any user space port, not likely used by any other service
const nextNodeServer = next({ dev, hostname, port }) // Create the server
run(nextNodeServer) // Start the application

/**
 * 
 * @param { import('next/dist/server/next-server').default } app 
 */
function run(app) 
{
    const handle = app.getRequestHandler()
    app.prepare().then(async () =>
    {
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
        server.listen(port, hostname, () => {
            process.stdout.write(`Listening on http://${ hostname }:${ port } in ${ dev ? "development" : "production" } mode.\n`)
            process.stdout.write("===READY===\n")
        })
    });
}