const util = require("util")

const helloPluto = util.deprecate(() =>{
    console.log("hello pluto")
}, "pluto is deprecated. It is no a planet anymore")

helloPluto()

//Haciendo debugging en node, se usa el flag "--inspect" antes del nombre del archivo