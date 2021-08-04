const fs = require("fs")
// const { request } = require("http")
const server = require("http").createServer()
const port = 3000

server.on("request", (request, response) => {
    fs.readFile("./big", (error, data) => {//Tiene un callback, un error first callback, primero recibe un error y la data
        if (error) {
            console.error("error", error)
        }

        res.end(data)
    })
})

server.listen(port)
console.log(`Servidor en el puerto ${port}`)
//con este comando: curl -i localhost:3000 le estamos haciendo una petición directamente a nuestro servidor, el problema es que al empezar a procesar toda la data, va a empezar a cosumir toda la memoria posible, puede hacer que el servidor colapse, esto lo vamos a solucionar con streams 