//Vamos a probar las rutas, el objetivo de este test es que las mismas funcionen de manera adecuada

const assert = require('assert');
const proxyquire = require('proxyquire'); //proxyquire lo que hace es que cada vez que se hace un require nos permite elegir, que en lugar de traer el paquete real, trae un mock
// const { requests } = require('sinon');

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies.js');
const testServer = require('../utils/testServer.js');

describe('routes - movies', function () {
  const route = proxyquire('../routes/movies', {
    '../services/movies.js': MoviesServiceMock, //La llamada a los servicios normales va a ser reemplazada por MoviesServicesMock
  });

  const request = testServer(route);
  describe('GET /movies', function () {
    it('should respond with status 200', function (done) {
      //El callback con el done es para indicar cuando termina el test
      request.get('api/movies').expect(200, done);
    });

    it("should respond with the list of movies", function (done) {
      request.get("/api/movies").end((err,res) => {
        assert.deepEqual(res.body, {
          data: moviesMock,
          message: `Movies Listed`
        })
        done()
      })
    })
  });
});
