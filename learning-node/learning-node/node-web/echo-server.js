const http = require("http")
const server = http.createServer()
const port = 9001

//request es lo que llega del cliente
//response es lo que le va vamos a pasar al cliente, ambos on objetos de configuración
server.on("request", (request, response) => {
    if (request.method === "POST" && request.url == "/echo") {//Como esun POST no podemos acceder directamente a la URL ya que en ella los navegadores usualmente lo que hacen es hacer una petición GET, por lo que debemos utilizar postman. Para que sea realmente un servidor echo debemos recibir datos e imprimirlos
        let body = []
        request.on("data", chunk => {//Los chunk son pequeños paquetes de datos, los recibimos para procesarlos
            body.push(chunk)
        })
        .on("end", () => { //Termina el evento, termina de recibir los datos
            response.writeHead(200, {"Content-Type": "text/plain"})

            response.end("Hello World\n")
        })
    
    } else {
        response.statusCode = 404
        body = Buffer.concat(body).toString()
        response.end(body)//Respondemos con el body, son datos de tipo buffer, debemos convertirlo a un string
    }
    
})

server.listen(port)
console.log(`Servidor en la url http://localhost:${port}`)