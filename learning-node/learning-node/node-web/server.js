const http = require("http")
const server = http.createServer()
const port = 8000

//request es lo que llega del cliente
//response es lo que le va vamos a pasar al cliente, ambos on objetos de configuración
server.on("request", (request, response) => {
    response.statusCode = 200 //Todo está ok
    response.setHeader("Content-Type", "text/plain")//Definimos qué tipo de respuesta vamos a recibir, en este caso recibimos texto plano (text/plain)

    response.end("Hello World\n")//El "\n" es un caracter especial que nos permite meter un espacio o salto de linea al final
})

server.listen(port)
console.log(`Servidor en la url http://localhost:${port}`)