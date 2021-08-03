const promiseFunction = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() < 0.5) {
            resolve("hello world")//Como ahora se usa resolve en lugar de un callback, ya no hay necesidad de pasar el objeto null, el recibe directamente el mensaje
        } else {
            reject(new Error("Hellow Error"))
        }
    }, 2000)
})

async function asyncAwait () {
    try{
        const message = await promiseFunction()
        console.log("message", message)
    } catch(error) {
        console.log("errro", error)
    }
}

asyncAwait()