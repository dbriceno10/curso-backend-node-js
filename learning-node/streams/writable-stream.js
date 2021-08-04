const { Writable } = require("stream")

//const writableStream = new Writable({
   // defaultEncoding: 'utf8',
    /**
     *
    // * @param {*} chunk el buffer de entrada
    // * @param {*} encoding la codificación
     * del buffer, si el chunk es un string
     * el enconding es la codificación en
     * caracteres de esa cadena, si la
     * codificación es un buffer esta se puede
     * ignorar
     //* @param {*} callback esta función es
     * llamada cuando se complete el
     * procesamiento para el chunk
     * proporcionado.
     */

const writableStream = new Writable({
    write(chunk, encoding, callback) {//encoding es para definir la codficación, puede ser opcional, por ejemplo el utf-8
        console.log(chunk.toString())
        callback()
    }
})

process.stdin.pipe(writableStream)

//Lo importante de WS es que deben estar añadidos a un WS, podemos usar process.stdin que es la funionalidad nativa que se encarga de leer los datos, lalamamos pipe (indica que es un stream). Este ejemplo lee datos en consola y los imprime