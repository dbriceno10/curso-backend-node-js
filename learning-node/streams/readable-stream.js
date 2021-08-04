const { Readable } = require("stream")
const readbleStream = new Readable()
/**
 * Cuando se ejecuta el método push()
 * los datos son almacenados en el buffer
 * si no se consumen los datos en el buffer 
 * estos se almacenan en la cola interna 
 * hasta que son consumidos
 */
readbleStream.push(`${0/0} `.repeat(10).concat("Batman, Bactman!"))
/**
 * El stream de lectura se da por terminado
 * cuándo el buffer recibe un null en este caso
 * con el método push(null)
 */
//Edición de 0/0, .repeat es una función de los string
readbleStream.push(null)//indica que dejó de recibir datos

/**
 * "pipe(writable)" Este método nos permite 
 * encadenar diferentes streams para su 
 * manipulación por medio de cómputos. Lo que
 * hace es recibir un stream
 * de entrada, realiza una operación sobre 
 * dicho stream y devuelve un nuevo stream con
 * dicha transformación.
 * 
 * "stdout" es un writable stream que toma el 
 * buffer y lo muestra en pantalla
 */

readbleStream.pipe(process.stdout)//stdout es la funcionalidad que imprime en la consola