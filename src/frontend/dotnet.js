const { Server: HttpServer } = require('http')
const { parse } = require('url')
const next = require('next')


const dev = false; //process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
const nextNodeServer = next({ dev, hostname, port })

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
                //process.stdout.write("Received request\n")
                const parsedUrl = parse(req.url, true)
                const { query } = parsedUrl
    
                await handle(req, res, parsedUrl, query)
                
            } catch (err) {
                console.error('Error occurred handling', req.url, err)
                res.statusCode = 500
                res.end('internal server error')
            }
        }).listen(port, hostname, () => {
            process.stdout.write("===READY===\n")
        })
        server.on('clientError', e => {
            console.error("Client error", e)
        })
    });
}

run(nextNodeServer)