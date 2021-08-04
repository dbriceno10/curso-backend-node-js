const fs = require("fs")

const server = require("http").createServer()

const port = 3001

server.on("request", (request, response) => {
    //Este nuevo método va a leer nuestro archivo como un stream, y nos devueklve el src. Tienen un método llamado pipe, que integran un stream que escribe (el onjeto response es en realidad un stream)
    const src = fs.createReadStream("./big")
    src.pipe(response)
})

server.listen(port)
console.log(`Servidor en el puerto ${port}`)