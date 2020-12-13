import { getMongoRepository } from 'typeorm';
import { AxiosResponse } from 'axios';
import { IMovieTranslation } from 'dtos/Movie.dto';
import movieAPI from '../utils/axios';
import AppError from '../utils/errors/AppError';
import Movies from '../schemas/Movies';

interface IRequestDTO {
  id: string;
}

class SetMovieTranslationService {
  public async execute({ id }: IRequestDTO): Promise<Movies> {
    const moviesRepository = getMongoRepository(Movies);

    const movie = await moviesRepository.findOne(id);
    if (!movie) {
      throw new AppError('Movie does not exist on application!');
    }

    let response: AxiosResponse<IMovieTranslation & { id?: number }>;
    try {
      response = await movieAPI.get(`/${movie.movieId}/translations`);
    } catch (error) {
      throw new AppError(error.response.data, error.response.status);
    }

    const { data } = response;

    delete data.id;
    movie.translations = data;

    await moviesRepository.save(movie);

    return movie;
  }
}

export default SetMovieTranslationService;
