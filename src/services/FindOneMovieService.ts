import { getMongoRepository } from 'typeorm';
import Movies from '../schemas/Movies';
import AppError from '../utils/errors/AppError';

interface IRequestDTO {
  id: string;
}

class FindOneMoviesService {
  public async execute({ id }: IRequestDTO): Promise<Movies> {
    const moviesRepository = getMongoRepository(Movies);

    const movie = await moviesRepository.findOne(id);
    if (!movie) {
      throw new AppError('Movie does not exist');
    }

    return movie;
  }
}

export default FindOneMoviesService;
