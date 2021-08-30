//Clase 28, eliminamos los mocks para trabajar con mongo

const MongoLib = require('../lib/mongo');

class MoviesService {
  constructor() {
    this.collection = 'movies';
    this.mongoDB = new MongoLib();
  }

  async getMovies({ tags }) {
    //En el query vamos a buscar los tags, el $in es una sintaxis de mongo
    const query = tags && { tags: { $in: tags } };
    const movies = await this.mongoDB.getAll(this.collection, query);
    return movies || [];
  }

  async getMovie({ movieId }) {
    const movie = await this.mongoDB.get(this.collection, movieId);
    return movie || {};
  }

  async createMovie({ movie }) {
    this.createMovieId = await this.mongoDB.create(this.collection, movie);
    return this.createMovieId || {};
  }

  async updateMovie({ movieId, movie } = {}) {
    //Por defecto hacemos que los parámetros acá sea un objeto vacío para evitar problemas
    const updateMovieId = await this.mongoDB.update(
      this.collection,
      movieId,
      movie
    );
    return updateMovieId;
  }

  async deleteMovie({ movieId }) {
    const deletedMovieId = await this.mongoDB.delete(this.collection, movieId);
    return deletedMovieId;
  }

  // async partialUpdateMovie() {
  //   const updateMovieId = await Promise.resolve(moviesMock[0].id);
  //   return updateMovieId;
  // }
}

module.exports = MoviesService;
