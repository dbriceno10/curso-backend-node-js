//Explorando utilidades
// &s significa un string
// %d significa un número
// %j significa JSON
//Son pequeños placeholder para formatear nuestros datos
console.log("un %s y un %s", "perrito", "gatito")//consle.log trabaja por debajo con algo llamado util.format(). Los %s al ser ejecutados en al consola van a ser reemplazados en el mensaje por los argumentos siguientes correspondientes, es decir perrito y gatito

console.info("hello world")//un alias de console.log

console.warn("hello error")//un alias de console.error

console.assert(12 == "12")//Si hay un error(en un boolean) nos indica
console.assert(12 === "12")//Indicará Assertion failed

console.trace("hello")//Va a indicar la linea donde está ocurriendo, es decir si hay un error va a ser más específico al indicarnos la linea donde está ocurriendo

const util = require("util")
const debuglog = util.debuglog("foo")//foo es el namespace

debuglog("hello from foo") //Esto lo ejecutamos utilizando la variable de entorno NODE_DEBUG
