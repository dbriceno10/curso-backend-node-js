const fs = require("fs")


    const file = process.argv[2]
    if (!file) {
        throw new Error("Debes indicar el archivo que va a ser leído")
    }
    const content = fs.readFile(file, function(error, content) {
        if(error) {
            return console.error("error", error)
        }
        const lines = content.toString().split("\n").length
        console.log(lines)
    })//Ya no hay que especificar readFileSync, ya que por defecto node js trata de ser asíncrino

//El módulo file system no solo nos permite leer archivos sino que en el también podemos crear carpetas, leer directorios, crear archivos, eliminar archivos, etc. Es todo lo que un usuario puede hacer con archivos y carpetas.

//También podemos visitar la documentación de Nodejs 12.0 sobre FileSystem

