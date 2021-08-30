const boom = require('@hapi/boom');

function notFoundHandler(req, res) {//No recibe el next, por que lo más importante es que este middleware vaya hasta el final de las rutas(en index.js), es decir cuando ya haya pasado por todas las demás rutas
  const {
    output: { statusCode, payload },
  } = boom.notFound();

  res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;
