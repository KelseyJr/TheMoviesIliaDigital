import { getMongoRepository } from 'typeorm';
import { AxiosResponse } from 'axios';
import AppError from '../utils/errors/AppError';
import movieAPI from '../utils/axios';
import Movies from '../schemas/Movies';

interface IMoviesAxiosResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | Record<string, unknown>;
  budget: number;
  genres: Array<{ id: number; name: string }>;
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: Array<{ id: number; logo_path: string | null; name: string; origin_country: string }>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: Array<{ iso_639_1: string; name: string }>;
  status: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface IRequestDTO {
  movieId: number;
}

class CreateMovieService {
  public async execute({ movieId }: IRequestDTO): Promise<Movies> {
    const moviesRepository = getMongoRepository(Movies);

    let response: AxiosResponse<IMoviesAxiosResponse>;
    try {
      response = await movieAPI.get(`/${movieId}`);
    } catch (error) {
      throw new AppError(error.response.data, error.response.status);
    }

    const { data } = response;

    const movie = moviesRepository.create({
      adult: data.adult,
      backdropPath: data.backdrop_path,
      belongsToCollection: data.belongs_to_collection,
      budget: data.budget,
      genres: data.genres,
      homepage: data.homepage,
      imdbId: data.imdb_id,
      movieId: data.id,
      originalLanguage: data.original_language,
      originalTitle: data.original_title,
      overview: data.overview,
      popularity: data.popularity,
      posterPath: data.poster_path,
      productionCompanies: data.production_companies,
      productionCountries: data.production_countries,
      releaseDate: data.release_date,
      revenue: data.revenue,
      runtime: data.runtime,
      spokenLanguage: data.spoken_languages,
      status: data.status,
      tagline: data.tagline,
      title: data.title,
      video: data.video,
      voteAverage: data.vote_average,
      voteCount: data.vote_count,
    });

    await moviesRepository.save(movie);

    return movie;
  }
}

export default CreateMovieService;
