//Inicio del módulo de sistema operativo OS
const os = require("os")
//console.log(`CPU info`, os.cpus())
//console.log("IP address", os.networkInterfaces().lo.map(i => i.address))
// console.log("IP address", os.networkInterfaces())
// console.log("Free memory", os.freemem())
// console.log("Type", os.type())
// console.log("SO version", os.release())
console.log("Usr info", os.userInfo())