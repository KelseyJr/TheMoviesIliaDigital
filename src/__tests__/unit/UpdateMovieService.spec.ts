import { getMongoRepository, MongoRepository } from 'typeorm';
import MockAdapter from 'axios-mock-adapter';
import UpdateMovieService from '../../services/UpdateMovieService';
import AppError from '../../utils/errors/AppError';
import Movies from '../../schemas/Movies';
import movieAPI from '../../utils/axios';
import { movieDetails } from '../DataMock';
import MongoMock from '../MongoMockConnection';

let moviesRepository: MongoRepository<Movies>;
const mock = new MockAdapter(movieAPI);

describe('Update Movie - Unity', () => {
  beforeAll(async () => {
    await MongoMock.connect();
    moviesRepository = getMongoRepository(Movies);
  });

  beforeEach(async () => {
    await moviesRepository.deleteMany({});
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it('should be able to update movie', async () => {
    const movieId = 550;
    mock.onGet(`/${movieId}`).reply(200, movieDetails);

    const mockMovie1 = movieDetails;
    const movie1 = moviesRepository.create({
      adult: true,
      backdropPath: mockMovie1.backdrop_path,
      belongsToCollection: mockMovie1.belongs_to_collection,
      budget: mockMovie1.budget,
      genres: mockMovie1.genres,
      homepage: mockMovie1.homepage,
      imdbId: mockMovie1.imdb_id,
      movieId: mockMovie1.id,
      originalLanguage: mockMovie1.original_language,
      originalTitle: mockMovie1.original_title,
      overview: mockMovie1.overview,
      popularity: mockMovie1.popularity,
      posterPath: mockMovie1.poster_path,
      productionCompanies: mockMovie1.production_companies,
      productionCountries: mockMovie1.production_countries,
      releaseDate: mockMovie1.release_date,
      revenue: mockMovie1.revenue,
      runtime: mockMovie1.runtime,
      spokenLanguage: mockMovie1.spoken_languages,
      status: mockMovie1.status,
      tagline: mockMovie1.tagline,
      title: mockMovie1.title,
      video: mockMovie1.video,
      voteAverage: mockMovie1.vote_average,
      voteCount: mockMovie1.vote_count,
    });
    const savedMovie = await moviesRepository.save(movie1);

    const updateMovie = new UpdateMovieService();

    const movie = await updateMovie.execute({ id: savedMovie.id });

    expect(movie).toBeDefined();
    expect(movie.id.toString()).toBe(savedMovie.id.toString());
    expect(movie.movieId).toBe(movieId);
    expect(movie.adult).toBeFalsy();
  });

  it('should not be able to update movies when its not exists on application', async () => {
    const updateMovie = new UpdateMovieService();

    await expect(updateMovie.execute({ id: '507f1f77bcf86cd799439011' })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update movies when resource could not be found', async () => {
    const movieId = 550;

    mock.onGet(`/${movieId}`).reply(404, {
      status_message: 'The resource you requested could not be found.',
      status_code: 34,
    });

    const updateMovie = new UpdateMovieService();

    await expect(updateMovie.execute({ id: '507f1f77bcf86cd799439011' })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update movies when API_KEY is not valid', async () => {
    const movieId = 550;

    mock.onGet(`/${movieId}`).reply(401, {
      status_message: 'Invalid API key: You must be granted a valid key.',
      success: false,
      status_code: 7,
    });

    const updateMovie = new UpdateMovieService();

    await expect(updateMovie.execute({ id: '507f1f77bcf86cd799439011' })).rejects.toBeInstanceOf(AppError);
  });
});
