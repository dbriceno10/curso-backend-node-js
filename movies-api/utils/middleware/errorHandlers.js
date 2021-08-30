const boom = require('@hapi/boom');
const { config } = require('../../config');
//Queremos que el error que nos imprima contenga o no todo el starck del error(información), dependiendo de si estamos en producción o desarrollo

function withErrorStack(error, stack) {
  //Esta función no es un middleware
  if (config.dev) {
    return { ...error, stack }; //Usamos el spreat operator(...) en el error, ya que ahora vamos a manejar el error con boom, va a traer más información
  } else {
    return error;
  }
}

function logErrors(err, req, res, next) {
  console.log(err); //eslint-disable-line
  next(err); //next va a llamar nuestro siguiente middleware para manejar el error
}

function wrapErrors(err, req, res, next) {
  //Esta función nos va a permitir manejar errorres que no sean de tipo boom
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

//Por defecto express imprime los errores en formato html, pero como nosotros estamos utilizando una api lo mejor es imprimirlos en un formato json
function errorHandler(err, req, res, next) {//eslint-disable-line
  //express identifíca los middlewares es mediante los 4 parámeteros (err, req, res, next)
  const {
    output: { statusCode, payload },
  } = err; //A partir del error sacamos el output, información que podemos extraer de los errores boom
  //res.status(err.status || 500); //nos va a responder con el estatus del error  en caso de existir, y si no va a devolver un error 500. Con boon ya no es necesario manejarlo manualmente
  res.status(statusCode);
  // res.json(withErrorStack(err.message, err.stack));
  //Con boom ya no es necesario manejar manualmente el error del mensaje
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  errorHandler,
  wrapErrors,
};
