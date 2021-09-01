//Vamos a probar las rutas, el objetivo de este test es que las mismas funcionen de manera adecuada
// obtenemos el assert que es el que se encargá de verificar si es verdad o no nuestra
// comparación en los test
const assert = require('assert');
const proxyquire = require('proxyquire'); //proxyquire lo que hace es que cada vez que se hace un require nos permite elegir, que en lugar de traer el paquete real, trae un mock

// Traemos los mocks porque son los que nos van ayudar a verficar que esté funcionando
// correctamente.

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies');
// necesitamos el testServer para correr nuestro server.
const testServer = require('../utils/testServer');

// Describimos nuestros test con la palabra describe, esto es lo que va a imprimir la consola
// la cual recibe como callback una función, en esté caso vamos a hacer los test del get de las movies
describe('routes - movies', function () {
    // Para poder probar los test de las movies necesitamos obtener la ruta que vamos a probar
  // en esté caso nuestra ruta será intervenida por proxyquire, que va ser la ruta de las movies
  // Lo que vamos a hacer es que ese archivo que nos llega de rutas, el cúal tiene una dependencia
  // nuestro servicio real, nosotros no queremos que cuando estemos llamando nuestras rutas
  // que llame nuestros servicios, porque el objetivo de estos test es que las rutas hagan su trabajo
  // ya más adelante haremos una prueba directa a los servicios
  const route = proxyquire('../routes/movies', {
      // La inclusión de esté servicio como está escrita allá, será remplazada por MoviesServicesMock
    '../services/movies.js': MoviesServiceMock, //La llamada a los servicios normales va a ser reemplazada por MoviesServicesMock
  });

   // creamos un request que va ser pasando testServer y le pasamos está ruta.
  // Aquí lo que estamos haciendo es usando nuestro testServer y lo único que estamos cargando
  // es está única ruta, así hacemos que el test sea especifico para esa ruta.


  const request = testServer(route);
  describe('GET /movies', function () {
        // debería responder con un status 200, recibe un callback con el done, 
    it('should respond with status 200', function (done) {
      //El callback con el done es para indicar cuando termina el test
      request.get('/api/movies/').expect(200, done);
    });

    it('should respond with the list of movies', function (done) {
      // acá cambia un poco la manera en como lo hacemos, porque sería igual, la misma petición 
      // pero en vez de llamar el expect, finalizamos está petición, la cual tiene un callback,
      // que recibe un error-first y  el response
      request.get('/api/movies').end((err, res) => {
        // acá llamamos al assert, el cual debería ser exactamente igual 
        // queremos corroborrar cual fue la respuesta del body, debería traer las movies
        assert.deepEqual(res.body, {
          // debería ser igual a data y el mensaje
          data: moviesMock,
          message: `Movies Listed`,
        });

        // done sirve para que el test se de cuenta, cuando finalizo, como estó
        //  tiene un callback tenemos que decirle que el test finalizo acá
        // si no lo pasamos el test nuca sabra cuando finaliza y le dara un timeout.
        done();
      });
    });
  });
});
