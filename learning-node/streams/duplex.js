const { read } = require("fs")
const { Duplex } = require("stream")

const duplexStream =  new Duplex({
    write(chunk, encording, callback) {
        console.log(chunk.toString())//Recordar que chunk viene como datos de tipo buffer, hay que pasarlo a string
        callback()
    },

    read(size) {
        if(this.currentCharcode > 90) {
            this.push(null)
            return
        }

        this.push(String.fromCharCode(this.currentCharcode++))
    }
})

duplexStream.currentCharcode = 65//Inicializamos desde la letra A
process.stdin.pipe(duplexStream).pipe(process.stdout)