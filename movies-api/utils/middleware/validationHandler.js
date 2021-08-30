function validate() {
  return false;
}

function validationHandler(schema, check = 'body') {
  return function (req, res, next) {
    //Es una función middleware
    const error = validate(req[check], schema);

    error ? next(new Error(error)) : next();

    // if (error) {
    //   next(new Error(error));
    // } else {
    //   next();
    // }
  };
}

module.exports = validationHandler;
