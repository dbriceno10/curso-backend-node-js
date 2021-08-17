const express = require('express');
//Mocks: son archivos de datos "falsos", para tener data de prueba
const { moviesMock } = require('../utils/mocks/movies');

/** vamos a recibir una aplicación de express, lo que nos permite ser dinamicos y obtener el control,
 * sobre que aplicación va a consumir nuestra ruta.
 */

const moviesApi = (app) => {
  //Creamos el router
  const router = express.Router();
  // le decimos a la aplicación que le vamos a pasar como parametro le vamos a decir la ruta de inicio

  app.use('/api/movies', router);

  // Apartir de aqui lo que hacemos es alimentar el router con las otras rutas
  // Cuando se le asigna un get al home, y el home va a ser api/movies, que fue el que definimos arriba

  /* nos va a devolver las salidas, como estamos escribiendo código asincrono debemos usar la palabra
  clave async, recuerden que una ruta recibe el request, el response object y en este caso vamos a 
  recibir la funcionalidad next, esto hace parte de la teoria de middleware que vamos a explicar 
  más adelante
*/

  // router.get('/', async function (req, res, next) {
    router.get('/', async (req, res, next) => {
    try {
      const movies = await Promise.resolve(moviesMock);
      
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
};

module.exports = moviesApi;
