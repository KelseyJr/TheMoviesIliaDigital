import { getMongoRepository } from 'typeorm';
import Movies from '../schemas/Movies';

class FindAllMoviesService {
  public async execute(): Promise<Movies[]> {
    const moviesRepository = getMongoRepository(Movies);

    const movies = await moviesRepository.find({ order: { createdAt: 'DESC' } });

    return movies;
  }
}

export default FindAllMoviesService;
