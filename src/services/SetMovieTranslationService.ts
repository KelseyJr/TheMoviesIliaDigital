import { getMongoRepository } from 'typeorm';
import { AxiosResponse } from 'axios';
import { IMovieTranslation } from 'dtos/Movie.dto';
import movieAPI from '../utils/axios';
import AppError from '../utils/errors/AppError';
import Movies from '../schemas/Movies';

interface IMovieTranslationResponse {
  id?: number;
  translations: IMovieTranslation[];
}

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

    let response: AxiosResponse<IMovieTranslationResponse>;
    try {
      response = await movieAPI.get(`/${movie.movieId}/translations`);
    } catch (error) {
      throw new AppError(error.response.data, error.response.status);
    }

    const { data } = response;

    delete data.id;
    movie.translations = data.translations;

    await moviesRepository.save(movie);

    return movie;
  }
}

export default SetMovieTranslationService;
