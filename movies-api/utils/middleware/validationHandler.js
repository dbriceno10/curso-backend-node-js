const boom = require('@hapi/boom');

function validate() {
  return false;
}

function validationHandler(schema, check = 'body') {
  return function (req, res, next) {
    //Es una función middleware
    const error = validate(req[check], schema);
    error ? next(boom.badRequest(error)) : next();
    // error ? next(new Error(error)) : next();

    // if (error) {
    //   next(new Error(error));
    // } else {
    //   next();
    // }
  };
}

module.exports = validationHandler;
