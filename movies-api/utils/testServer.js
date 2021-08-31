const express = require('express');
const supertest = require('supertest');

function testServer(route) {
  const app = express();
  //No olviden en test-server hacer uso del parse de express para formato json, el no hacerlo puede generarle error, en su defectoque la prueba falle.
  app.use(express.json());
  route(app);
  return supertest(app);
}

module.exports = testServer;
//Esto lo que hará es levantar un servidor de pruebas, aislado del principal, ademas de que no nos interesa probar toda la aplicación, sino una parte específica