const { config } = require('../config');

//Siempre hay que revisar si el chace esta activado
//No todas las rutas tienen que tener caché, solo las rutas que estamos requiriendo recursos. 

function cacheResponse(res, seconds) {
  if (!config.dev) {
    res.set('Cache-Contro', `public, max-age=${seconds}`);
  }
}


module.exports = cacheResponse;