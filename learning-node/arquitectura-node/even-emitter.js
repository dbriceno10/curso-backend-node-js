const EventEmitter = require("events")

class Logger extends EventEmitter {
    excecute(cb) {
        console.log("Before")
        this.emit("start")
        cb()
        this.emit("finish")
        console.log("After")
    }
}

const logger = new Logger()

logger.on("start", () => console.log("Starting"))
logger.on("finish", () => console.log("Finishing"))
logger.on("finish", () => console.log("It's Done")) // 'It/'s Done' es otra manera de escribir el mensaje, para que no tome el apóstrofe como una comilla

//logger.excecute(() => console.log("hello world"))
logger.excecute(() => setTimeout(() => console.log("hello world"), 500))
