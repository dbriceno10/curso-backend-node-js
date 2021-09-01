//slash
const express = require('express');
const slash = require('express-slash');
const MoviesServices = require('../services/movies');

// habilitar rutas estructas
app.enable('strict routing');

function moviesApi(app) {
  // Crear el router con algunas opciones para establecer el modo estricto de ruta
  const router = express.Router({
    caseSensitive: app.get('case sensitive routing'),
    strict: app.get('strict routing')
  });

  app.use('/api/movies', router);
  // añadir el middleware de slash
  app.use(slash());
...
}

//mongan

// i morgan
//Para poder tener rotación del archivo de log usamos:

//npm i rotating-file-stream
//en nuestro index.js agregamos lo siguiente:

const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
...
// create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
})

//Logger
app.use(morgan('combined', { stream: accessLogStream }))
...