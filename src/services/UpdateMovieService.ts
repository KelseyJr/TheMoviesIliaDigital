import { getMongoRepository } from 'typeorm';
import AppError from '../utils/errors/AppError';
import findMovieDetails from '../utils/Movies/findMovieDetails';
import Movies from '../schemas/Movies';

interface IRequestDTO {
  id: string;
}

class UpdateMovieService {
  public async execute({ id }: IRequestDTO): Promise<Movies> {
    const moviesRepository = getMongoRepository(Movies);

    const movie = await moviesRepository.findOne(id);
    if (!movie) {
      throw new AppError('Movie does not exist on application!');
    }

    const movieData = await findMovieDetails({ movieId: movie.movieId });

    const updatedMovie = Object.assign(movie, movieData);

    await moviesRepository.save(updatedMovie);

    return movie;
  }
}

export default UpdateMovieService;
