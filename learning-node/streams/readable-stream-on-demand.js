const { Readable } = require("stream")
const readbleStream = new Readable({
    /**
   * constructor
   //* @param {*} size tamaño del buffer
   * de lectura este se representa en bytes
   * y el valor por defecto es 16kb para un
   * readable stream y para fs es de 64kb
   * parámetro opcional
   */
    read(size) {
        setTimeout(() => {
            //La letra es mayor que z
            if (this.currentCharCode > 90) {
                //Finalizamos la lectura
                this.push(null)
            return
            }
               /**
       * agregamos la letra al buffer y después
       * se le suma 1 
       */
      
            this.push(String.fromCharCode(this.currentCharCode++))
        }, 100)
    }
})

/**
 * inicializamos el atributo chartCode
 * y le asignamos el valor  ASCII de la letra A
 */

readbleStream.currentCharCode = 65
//Edición de 0/0, .repeat es una función de los string
//readbleStream.push(null)//indica que dejó de recibir datos

/**
 * manejamos el stream de lectura y le asignamos
 * un stream de salida por pantalla
 */

readbleStream.pipe(process.stdout)//stdout es la funcionalidad que imprime en la consola