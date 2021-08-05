const fs = require("fs")

//Las utilidades en node pueden funcionar tanto de manera sincrona como asíncrona. En node cuando se ejecuta de manera sincrona necesitamos usar callbacks porque es la manera en la que el sabe cuando ya terminamos, ejecute mi código que quiero procesar despues de que hizo todo lo que tenia que hacer esté modulo

try {
    const file = process.argv[2]//Argumenos en vector(argv) o vector de argumentos, nos permite leer lo que pasamos por la terminal, en la primera posición va la palabra node, luego nuestro archivo, y por último el resultado
    const content = fs.readFileSync(file).toString()

    const lines = content.split("\n").length;//Estamos contando las lineas
    console.log(lines)
} catch(error) {
    console.error("error", error)
}