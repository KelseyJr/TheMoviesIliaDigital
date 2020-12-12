import request from 'supertest';
import { getMongoRepository, MongoRepository } from 'typeorm';
import MockAdapter from 'axios-mock-adapter';
import Movies from '../../schemas/Movies';
import movieAPI from '../../utils/axios';
import { movieDetails } from '../DataMock';
import MongoMock from '../MongoMockConnection';
import app from '../../app';

let moviesRepository: MongoRepository<Movies>;
const mock = new MockAdapter(movieAPI);
describe('Save movie - Integration', () => {
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

    const response = await request(app).post(`/movies`).send({
      movieId,
    });

    expect(response.status).toBe(200);
    expect(response.body.movieId).toBe(movieId);
  });

  it('should not be able to save movies when resource could not be found', async () => {
    const movieId = 550;

    mock.onGet(`/${movieId}`).reply(404, {
      status_message: 'The resource you requested could not be found.',
      status_code: 34,
    });

    const response = await request(app).post(`/movies`).send({
      movieId,
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toMatchObject({
      status_message: 'The resource you requested could not be found.',
      status_code: 34,
    });
  });

  it('should not be able to save movies when API_KEY is not valid', async () => {
    const movieId = 550;

    mock.onGet(`/${movieId}`).reply(401, {
      status_message: 'Invalid API key: You must be granted a valid key.',
      success: false,
      status_code: 7,
    });

    const response = await request(app).post(`/movies`).send({
      movieId,
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toMatchObject({
      status_message: 'Invalid API key: You must be granted a valid key.',
      success: false,
      status_code: 7,
    });
  });

  it('should not be able to save movies when movieId params is not number', async () => {
    const movieId = '550';

    const response = await request(app).post(`/movies`).send({
      movieId,
    });

    expect(response.body.statusCode).toBe(400);
    expect(response.body.message).toBe('celebrate request validation failed');
    expect(response.body.validation.body.message).toBe('"movieId" must be a number');
  });

  it('should not be able to save movies when movieId params is not given', async () => {
    const response = await request(app).post(`/movies`);

    expect(response.body.statusCode).toBe(400);
    expect(response.body.message).toBe('celebrate request validation failed');
    expect(response.body.validation.body.message).toBe('"movieId" is required');
  });
});
