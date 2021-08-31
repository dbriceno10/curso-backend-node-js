const joi = require('joi');

const movieIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);//regex() es una funcionalidad para el menejo de expresiones regulares, los argumentos que se están pasando es porque están dentro del encoding exadecimal

const movieTitleSchema = joi.string().max(80);
const movieYearSchema = joi.number().min(1888).max(2077);//nos permite años para las películas comprendidios entre 1888 y 2077 (min y max)
const movieCoverSchema = joi.string().uri();
const movieDescriptionSchema = joi.string().max(300);
const movieDurationShema = joi.number().min(1).max(300);
const movieContentRatingShema = joi.string().max(5);
const movieSourceSchema = joi.string().uri();
const movieTagsSchema = joi.array().items(joi.string().max(50));

const createMovieSchema = joi.object({
  title: movieTitleSchema.required(),
  year: movieYearSchema.required(),
  cover: movieCoverSchema.required(),
  description: movieDescriptionSchema.required(),
  duration: movieDurationShema.required(),
  contentRating: movieContentRatingShema.required(),
  source: movieSourceSchema.required(),
  tags: movieTagsSchema,
});

const updateMovieSchema = joi.object({
  title: movieTitleSchema,
  year: movieYearSchema,
  cover: movieCoverSchema,
  description: movieDescriptionSchema,
  duration: movieDurationShema,
  contentRating: movieContentRatingShema,
  source: movieSourceSchema,
  tags: movieTagsSchema,
});

module.exports = {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
};
