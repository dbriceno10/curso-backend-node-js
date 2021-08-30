const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js');

const { logErrors, errorHandler} = require("./utils/middleware/errorHandlers.js")

//middelware de body parser
app.use(express.json());

moviesApi(app);

app.use(logErrors)
app.use(errorHandler)
//Los middlewares de error siempre deben ir al final de nuestras rutas, recordemos que las rutas tambien son middlewares, las firmas de nuestra ruta son los objetos request, response y la funcionalidad next

app.listen(config.port, function () {
  // app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);//eslint-disable-line
});
