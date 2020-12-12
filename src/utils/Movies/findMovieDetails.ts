import { AxiosResponse } from 'axios';
import Movies from '../../schemas/Movies';
import movieAPI from '../axios';
import { IMovies } from '../../dtos/Movie.dto';

import AppError from '../errors/AppError';

interface IRequestDTO {
  movieId: number;
}

export default async ({ movieId }: IRequestDTO): Promise<Omit<Movies, 'id' | 'createdAt' | 'updatedAt'>> => {
  let response: AxiosResponse<IMovies>;
  try {
    response = await movieAPI.get(`/${movieId}`);
  } catch (error) {
    throw new AppError(error.response.data, error.response.status);
  }

  const { data } = response;

  const movie: Omit<Movies, 'id' | 'createdAt' | 'updatedAt'> = {
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
  };

  return movie;
};
