const promise =  new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() < 0.5) {
            resolve("hello world")//Como ahora se usa resolve en lugar de un callback, ya no hay necesidad de pasar el objeto null, el recibe directamente el mensaje
        } else {
            reject(new Error("Hellow Error"))
        }
    }, 2000)
})

promise
    .then(message => message.toUpperCase())
    .then(message => console.log("message", message))
    .catch(error => console.error("error", error))