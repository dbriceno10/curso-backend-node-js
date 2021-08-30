const { config } = require('../../config');
//Queremos que el error que nos imprima contenga o no todo el starck del error(información), dependiendo de si estamos en producción o desarrollo

function withErrorStack(error, stack) {
  //Esta función no es un middleware
  if (config.dev) {
    return { error, stack };
  } else {
    return error;
  }
}

function logErrors(err, req, res, next) {
  console.log(err); //eslint-disable-line
  next(err); //next va a llamar nuestro siguiente middleware para manejar el error
}
//Por defecto express imprime los errores en formato html, pero como nosotros estamos utilizando una api lo mejor es imprimirlos en un formato json
function errorHandler(err, req, res, next) { //eslint-disable-line
  //La linea anterior, pese a ser un comentario es una funcionalidad del linter, lo que hace es deshabiliarlo en la línea donde se especificó. Dado que al no usarse el parámetro next, el linter lo identifíca como un error, pero la manera como express identifíca los middlewares es mediante los 4 parámeteros
  res.status(err.status || 500); //nos va a responder con el estatus del error  en caso de existir, y si no va a devolver un error 500
  res.json(withErrorStack(err.message, err.stack));
}

module.exports = {
  logErrors,
  errorHandler,
};
