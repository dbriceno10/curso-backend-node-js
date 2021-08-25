const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js');

app.use(express.json());

moviesApi(app);
// app.get('/', function(request, response) {
//   response.send('hello world')
// })

// app.get('/json', function(request, response) {
//   response.json({hello: 'world'})
// })

app.listen(config.port, function () {
  // app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
