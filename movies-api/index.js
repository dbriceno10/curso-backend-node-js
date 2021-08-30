const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js');

const {
  logErrors,
  errorHandler,
  wrapErrors,
} = require('./utils/middleware/errorHandlers.js');

const notFoundHandler = require('./utils/middleware/notFoundHandler.js');

//middelware de body parser
app.use(express.json());
//routes
moviesApi(app);
//para capturar el error 404
app.use(notFoundHandler);

//Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);
//Los middlewares de error siempre deben ir al final de nuestras rutas, recordemos que las rutas tambien son middlewares, las firmas de nuestra ruta son los objetos request, response y la funcionalidad next

app.listen(config.port, function () {
  // app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`); //eslint-disable-line
});
