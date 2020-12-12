import { Request, Response } from 'express';
import CreateMovieService from '../services/CreateMovieService';
import FindAllMoviesService from '../services/FindAllMoviesService';

class MoviesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { movieId } = request.body;

    const createMovie = new CreateMovieService();

    const movie = await createMovie.execute({ movieId });

    return response.json(movie);
  }

  public async findAll(request: Request, response: Response): Promise<Response> {
    const findAllMovies = new FindAllMoviesService();

    const movies = await findAllMovies.execute();

    return response.json(movies);
  }
}

export default MoviesController;
