const express = require('express');
const MoviesService = require('../services/movies');

const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
} = require('../utils/schemas/movies');

const validationHandler = require('../utils/middleware/validationHandler');

const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../utils/time');

function moviesApi(app) {
  //Creamos el router
  const router = express.Router();
  // le decimos a la aplicación que le vamos a pasar como parametro le vamos a decir la ruta de inicio

  app.use('/api/movies', router);

  const moviesService = new MoviesService();

  // Apartir de aqui lo que hacemos es alimentar el router con las otras rutas
  // Cuando se le asigna un get al home, y el home va a ser api/movies, que fue el que definimos arriba

  router.get('/', async function (req, res, next) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    // router.get('/', async (req, res, next) => {
    const { tags } = req.query;

    try {
      const movies = await moviesService.getMovies({ tags });
      // throw new Error("Error getting movies")
      // Usamos response, definimos el estatus, que como hablamos con anterioridad va a ser 200 de ok
      // definimos su estructura json
      res.status(200).json({
        data: movies,
        message: 'movies listed',
      });
    } catch (error) {
      next(error);
    }
  });

  //Recibe el id de la película
  router.get(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async function (req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      // validationHandler por defecto va a tratar de sacar los datos del body, pero como el id de la película se encuentra dentro de los parámetros, los voy a tomar de allí
      const { movieId } = req.params;
      //La diferencia principal entre params y query es que
      //params: están establecidos en la url
      //query: se le pone el signo "?", el nombre del query y se puede concatenar

      try {
        //No interesa que nos regrese la priméra película
        const movies = await moviesService.getMovie({ movieId });
        res.status(200).json({
          data: movies,
          message: 'movie retrieved',
        });
      } catch (error) {
        next(error);
      }
    }
  );
  //Creamos la película
  router.post(
    '/',
    validationHandler(createMovieSchema),
    async function (req, res, next) {
      //Los middlewares se colocan entre la ruta('/') y la definición de la ruta(async function(req, res, next))
      const { body: movie } = req;

      try {
        //Devolvemos el id de la primera película
        const createMovieId = await moviesService.createMovie({ movie });
        res.status(201).json({
          //Como estamos creando el código que debemos devolver es 201
          data: createMovieId,
          message: 'movie created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //actualización de la película
  router.put(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema),
    async function (req, res, next) {
      const { movieId } = req.params;
      const { body: movie } = req;
      //El update(put) va a recibir tanto el parámetro, como el cuerpo(body)

      try {
        const updatedMovieId = await moviesService.updateMovie({
          movieId,
          movie,
        });
        res.status(200).json({
          data: updatedMovieId,
          message: 'movie updated',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //Eliminando una película
  router.delete(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async function (req, res, next) {
      const { movieId } = req.params;

      try {
        const deleteMovieId = await moviesService.deleteMovie({ movieId });
        res.status(200).json({
          data: deleteMovieId,
          message: 'movie deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  //Implementación de método PATCH para actualización parcial
  // router.patch('/:movieId', async (req, res, next) => {
  //   const { movieId } = req.params;
  //   const { body: movie } = req;
  //   try {
  //     const updateMovie = await moviesService.partialUpdateMovie({
  //       movieId,
  //       movie,
  //     });

  //     res.status(200).json({
  //       data: updateMovie,
  //       message: `Movie Updated Partially`,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // });
}

module.exports = moviesApi;
