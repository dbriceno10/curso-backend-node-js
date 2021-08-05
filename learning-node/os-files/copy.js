const fs = require("fs")

//copyFile, el primer argumento que recibe es el nombre del archivo a comiar y el segundo es el nombre que va a tener la copia, luego de sigue manejando el error, recordemos que por defecto estos módulos son asíncronos
fs.copyFile("naranja.txt", "orange.txt", error => {
    if(error) {
        return console.error("error", error)
    }

    console.log("naranja.txt fue copiado como orange.txt")
})