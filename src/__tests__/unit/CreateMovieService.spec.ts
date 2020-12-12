import { getMongoRepository, MongoRepository } from 'typeorm';
import MockAdapter from 'axios-mock-adapter';
import AppError from '../../utils/errors/AppError';
import CreateMovieService from '../../services/CreateMovieService';
import Movies from '../../schemas/Movies';
import movieAPI from '../../utils/axios';
import { movieDetails } from '../DataMock';
import MongoMock from '../MongoMockConnection';

let moviesRepository: MongoRepository<Movies>;
const mock = new MockAdapter(movieAPI);

describe('Save Movie - Unity', () => {
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

  it('should be able to save movies', async () => {
    const movieId = 550;
    mock.onGet(`/${movieId}`).reply(200, movieDetails);

    const createMovie = new CreateMovieService();

    const movie = await createMovie.execute({ movieId });

    expect(movie).toBeDefined();
    expect(movie.movieId).toBe(movieId);
  });

  it('should not be able to save movies when resource could not be found', async () => {
    const movieId = 550;

    mock.onGet(`/${movieId}`).reply(404, {
      status_message: 'The resource you requested could not be found.',
      status_code: 34,
    });

    const createMovie = new CreateMovieService();

    await expect(createMovie.execute({ movieId })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to save movies when API_KEY is not valid', async () => {
    const movieId = 550;

    mock.onGet(`/${movieId}`).reply(401, {
      status_message: 'Invalid API key: You must be granted a valid key.',
      success: false,
      status_code: 7,
    });

    const createMovie = new CreateMovieService();

    await expect(createMovie.execute({ movieId })).rejects.toBeInstanceOf(AppError);
  });
});
