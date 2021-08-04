const http = require("http")
const server = http.createServer()
const port = 8001


server.on("request", (request, response) => {
    if (request.method === "POST" && request.url == "/birthday") {
        let body = []
        request.on("data", chunk => {
            body.push(chunk)
        })
        .on("end", () => {
            response.writeHead(200, {"Content-Type": "text/plain"})
            body = Buffer.concat(body).toString("-")

            const year = body[2];
            const month = body[1] - 1;
            const day = body[0];
            const birthday = new Date(year, month, day);
            response.end(birthday.toString().split(" ")[0])
        })
    
    } else {
        response.statusCode = 404
        // body = Buffer.concat(body).toString()
        response.end(body)
    }
    
})

server.listen(port)
console.log(`Servidor en la url http://localhost:${port}`)