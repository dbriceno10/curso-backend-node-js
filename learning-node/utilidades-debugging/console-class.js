const fs = require("fs")

//directorios que vamos a crear
const out =  fs.createWriteStream("./out.log")
const err = fs.createWriteStream("./err.log")
//Con "./" indicamos que estamos dentro del fichero actual
//Haremos nuestra consola personalizada, la llamamos consoleFile para que no choque con la consola por defecto
const consoleFile = new console.Console(out, err)//estos parametros que le pasamos son out: la salida donde vamos a imprimir todo lo que enviemos y err: donde vamos a imprimir los errores en caso de haberlos

setInterval(() => {
    consoleFile.log(new Date());//Todo lo que se imprima aquí debería quedar en el archivo ./out.log
    consoleFile.error(new Error("Ooops Error"));//Todo lo que se imprima aquí debería quedar en el archivo ./err.log
}, 2000)