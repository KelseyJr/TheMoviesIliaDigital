import { getMongoRepository } from 'typeorm';
import AppError from '../utils/errors/AppError';
import Movies from '../schemas/Movies';
import findMovieDetails from '../utils/Movies/findMovieDetails';

interface IRequestDTO {
  movieId: number;
}

class CreateMovieService {
  public async execute({ movieId }: IRequestDTO): Promise<Movies> {
    const moviesRepository = getMongoRepository(Movies);

    const findMovie = await moviesRepository.findOne({ movieId });
    if (findMovie) {
      throw new AppError("Movie's already registered on application.");
    }

    const movieData = await findMovieDetails({ movieId });

    const movie = moviesRepository.create({
      adult: movieData.adult,
      backdropPath: movieData.backdropPath,
      belongsToCollection: movieData.belongsToCollection,
      budget: movieData.budget,
      genres: movieData.genres,
      homepage: movieData.homepage,
      imdbId: movieData.imdbId,
      movieId: movieData.movieId,
      originalLanguage: movieData.originalLanguage,
      originalTitle: movieData.originalTitle,
      overview: movieData.overview,
      popularity: movieData.popularity,
      posterPath: movieData.posterPath,
      productionCompanies: movieData.productionCompanies,
      productionCountries: movieData.productionCountries,
      releaseDate: movieData.releaseDate,
      revenue: movieData.revenue,
      runtime: movieData.runtime,
      spokenLanguage: movieData.spokenLanguage,
      status: movieData.status,
      tagline: movieData.tagline,
      title: movieData.title,
      video: movieData.video,
      voteAverage: movieData.voteAverage,
      voteCount: movieData.voteCount,
    });

    await moviesRepository.save(movie);

    return movie;
  }
}

export default CreateMovieService;
