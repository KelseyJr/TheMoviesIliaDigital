import { getMongoRepository } from 'typeorm';
import Movies from '../schemas/Movies';
import AppError from '../utils/errors/AppError';

interface IRequestDTO {
  id: string;
}

class DeleteMoviesService {
  public async execute({ id }: IRequestDTO): Promise<void> {
    const moviesRepository = getMongoRepository(Movies);

    const movie = await moviesRepository.findOne(id);
    if (!movie) {
      throw new AppError('Movie does not exist');
    }

    await moviesRepository.remove(movie);
  }
}

export default DeleteMoviesService;
