const http = require("http");

const server = http.createServer((req,res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, Nodejs!");
});

server.listen(3000);