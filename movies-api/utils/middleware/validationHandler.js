const boom = require('@hapi/boom');
const joi = require ('joi')


function validate(data, schema) {
	// If schema is not a joi schema convert to a joi schema object otherwise return schema
	schema = !joi.isSchema(schema) ? joi.object(schema) : schema;
	const { error } = schema.validate(data);
	return error;
}

function val(data, schema) {//eslint-disable-line
  const { error } = joi.validate(data, schema)
  return error;
}

// function validate() {
//   return false;
// }

function validationHandler(schema, check = 'body') {
  //check o "data"
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
