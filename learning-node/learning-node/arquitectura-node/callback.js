const asyncCallback = function(cb) {
    setTimeout(() => {
        if (Math.random() < 0.5) {
            return cb(null, "hello world")
        } else {
            cb(new Error("Hellow Error"))
        }
    }, 2000)
}

asyncCallback((error, message) => {
    if(error) {
        console.error("error", error)
    } else {
        console.log("message", message)
    }
})

//Cuando un callback tiene un error lo que voy a enviar como primer parámetro es el error, si no hay uno envío un null y los parámetros consecuentes.