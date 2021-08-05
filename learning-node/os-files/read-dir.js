const fs = require("fs")

const files = fs.readdir(__dirname, (error, files) => {
    if (error) {
        return console.error("error", error)
    }

    console.log(files)
})//Dirname, es el nombre de la carpeta que contiene la información del directorio actual que queremos leer actual.