const fs = require("fs")
//buscar rulas relativas y absolutas
fs.mkdir("platzi/escuela-js/node", { recursive: true }, (error => {
    if(error) {
        return console.error("error", error)
    }
}))//conel parametro recursivo, si no existen los directorios los va a crear sin problema