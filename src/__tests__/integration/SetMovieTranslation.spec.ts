import request from 'supertest';
import { getMongoRepository, MongoRepository } from 'typeorm';
import MockAdapter from 'axios-mock-adapter';
import Movies from '../../schemas/Movies';
import movieAPI from '../../utils/axios';
import { movieDetails, movieTranslations } from '../DataMock';
import MongoMock from '../MongoMockConnection';
import app from '../../app';

let moviesRepository: MongoRepository<Movies>;
const mock = new MockAdapter(movieAPI);
describe('Set movie translation - Integration', () => {
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

  it('should be able to set movie translation', async () => {
    const movieId = 550;
    mock.onGet(`/${movieId}/translations`).reply(200, movieTranslations);

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

    const response = await request(app).patch(`/movies/${savedMovie.id}/translations`).send({});

    expect(response.status).toBe(200);
    expect(response.body.id.toString()).toBe(savedMovie.id.toString());
    expect(response.body.movieId).toBe(movieId);
    expect(response.body.translations).toBeDefined();
  });

  it('should not be able to set movie translation when its does not exists on application', async () => {
    const response = await request(app).patch(`/movies/507f1f77bcf86cd799439011/translations`).send({});

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Movie does not exist on application!',
    });
  });

  it('should not be able to set movie translation when resource could not be found', async () => {
    const movieId = 550;

    mock.onGet(`/${movieId}/translations`).reply(404, {
      status_message: 'The resource you requested could not be found.',
      status_code: 34,
    });

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

    const response = await request(app).patch(`/movies/${savedMovie.id}/translations`).send({});

    expect(response.status).toBe(404);
    expect(response.body.message).toMatchObject({
      status_message: 'The resource you requested could not be found.',
      status_code: 34,
    });
  });

  it('should not be able to set movie translation when API_KEY is not valid', async () => {
    const movieId = 550;

    mock.onGet(`/${movieId}/translations`).reply(401, {
      status_message: 'Invalid API key: You must be granted a valid key.',
      success: false,
      status_code: 7,
    });

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

    const response = await request(app).patch(`/movies/${savedMovie.id}/translations`).send({});

    expect(response.status).toBe(401);
    expect(response.body.message).toMatchObject({
      status_message: 'Invalid API key: You must be granted a valid key.',
      success: false,
      status_code: 7,
    });
  });
});
