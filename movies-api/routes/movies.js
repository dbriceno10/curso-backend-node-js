const express = require('express');
const MoviesService = require('../services/movies');

const moviesApi = (app) => {
  //Creamos el router
  const router = express.Router();
  // le decimos a la aplicación que le vamos a pasar como parametro le vamos a decir la ruta de inicio

  app.use('/api/movies', router);

  const moviesService = new MoviesService();

  // Apartir de aqui lo que hacemos es alimentar el router con las otras rutas
  // Cuando se le asigna un get al home, y el home va a ser api/movies, que fue el que definimos arriba

  // router.get('/', async function (req, res, next) {
  router.get('/', async (req, res, next) => {
    const { tags } = req.query;

    try {
      const movies = await moviesService.getMovies({ tags });

      // Usamos response, definimos el estatus, que como hablamos con anterioridad va a ser 200 de ok
      // definimos su estructura json
      res.status(200).json({
        data: movies,
        message: `Movies Listed`,
      });
    } catch (error) {
      next(error);
    }
  });

  //Recibe el id de la película
  router.get('/:movieID', async (req, res, next) => {
    const { movieId } = req.params;
    //La diferencia principal entre params y query es que
    //params: están establecidos en la url
    //query: se le pone el signo "?", el nombre del query y se puede concatenar

    try {
      //No interesa que nos regrese la priméra película
      const movies = await moviesService.getMovie({ movieId });
      res.status(200).json({
        data: movies,
        message: `Movie Retrieved`,
      });
    } catch (error) {
      next(error);
    }
  });
  //Creamos la película
  router.post('/', async (req, res, next) => {
    const { body: movie } = req;

    try {
      //Devolvemos el id de la primera película
      const createMovieId = await moviesService.createMovie({ movie });
      res.status(201).json({
        //Como estamos creando el código que debemos devolver es 201
        data: createMovieId,
        message: `Movie Created`,
      });
    } catch (error) {
      next(error);
    }
  });

  //actualización de la película
  router.put('/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    const { body: movie } = req;

    try {
      const updatedMovieId = await moviesService.updateMovie({
        movieId,
        movie,
      });
      res.status(200).json({
        data: updatedMovieId,
        message: `Movie Updated`,
      });
    } catch (error) {
      next(error);
    }
  });

  //Eliminando una película
  router.delete('/:movieId', async (req, res, next) => {
    const { movieId } = req.params;

    try {
      const deleteMovieId = await moviesService.deleteMovie({ movieId });
      res.status(200).json({
        data: deleteMovieId,
        message: `Movie Deleted`,
      });
    } catch (error) {
      next(error);
    }
  });

  //Implementación de método PATCH para actualización parcial
  router.patch('/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    const { body: movie } = req;
    try {
      const updateMovie = await moviesService.partialUpdateMovie({
        movieId,
        movie,
      });

      res.status(200).json({
        data: updateMovie,
        message: `Movie Updated Partially`,
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = moviesApi;
