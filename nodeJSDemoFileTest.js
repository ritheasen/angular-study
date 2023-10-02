const http = require('http');
const fs = require('fs');
const url = require('url');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Parse the URL from the request
    const parsedUrl = url.parse(req.url);
    // Check if the path of the URL is "/hello"
    if (parsedUrl.pathname === '/hello') {
        // Read the contents of a file (hello.txt in this case)
        fs.readFile('hello.txt', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                console.log(err);
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        })
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
})