const { Transform } = require("stream")

const transformStream = new Transform({
    transform(chunk, encording, callback) {//en el transform tenemos todas las propiedades directamente del write y read
        this.push(chunk.toString().toUpperCase())
        callback()
    }
})

process.stdin.pipe(transformStream).pipe(process.stdout)