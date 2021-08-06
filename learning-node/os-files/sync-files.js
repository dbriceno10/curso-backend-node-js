const fs = require("fs")

//Las utilidades en node pueden funcionar tanto de manera sincrona como asíncrona. En node cuando se ejecuta de manera sincrona necesitamos usar callbacks porque es la manera en la que el sabe cuando ya terminamos, ejecute mi código que quiero procesar despues de que hizo todo lo que tenia que hacer esté modulo

try {
    const file = process.argv[2]//Argumenos en vector(argv) o vector de argumentos, nos permite leer lo que pasamos por la terminal, en la primera posición va la palabra node, luego nuestro archivo, y por último (tercera posición), va el primer argumento que realmente pasó el usuario.
    const content = fs.readFileSync(file).toString()

    const lines = content.split("\n").length;//Estamos contando las lineas
    console.log(lines)
} catch(error) {
    console.error("error", error)
}


// Node.js program to demonstrate the
// process.argv Property

// Include process module
// const process = require('process');

// Printing process.argv property value
// console.log(process.argv);

// Command to run the code:
// node index.js extra_argument1 extra_argument2 3


// Node.js program to demonstrate the
// process.argv Property
   
// Include process module
// const process = require('process');
  
// // Printing process.argv property value
// var args = process.argv;
  
// console.log("number of arguments is "+args.length);
  
// args.forEach((val, index) => {
//     console.log(`${index}: ${val}`);
// });
// Command to run the code:

// node index.js extra_argument1 extra_argument2 3