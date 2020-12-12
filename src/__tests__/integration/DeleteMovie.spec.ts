import request from 'supertest';
import { getMongoRepository, MongoRepository } from 'typeorm';
import Movies from '../../schemas/Movies';
import { movieDetails } from '../DataMock';
import MongoMock from '../MongoMockConnection';
import app from '../../app';

let moviesRepository: MongoRepository<Movies>;
describe('Delete movie - Integration', () => {
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

  it('should be able to delete one movie', async () => {
    const mockMovie1 = movieDetails;
    const movie1 = moviesRepository.create({
      adult: mockMovie1.adult,
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

    const savedMovie1 = await moviesRepository.save(movie1);

    const response = await request(app).delete(`/movies/${savedMovie1.id}`).send({});

    expect(response.status).toBe(200);
    expect(response.body.deleted).toBeTruthy();
  });

  it('should not be able to delete movie when its not exist', async () => {
    const response = await request(app).delete(`/movies/507f1f77bcf86cd799439011`).send({});

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Movie does not exist',
    });
  });
});
