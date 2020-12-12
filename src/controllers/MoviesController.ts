import { Request, Response } from 'express';
import CreateMovieService from '../services/CreateMovieService';
import FindAllMoviesService from '../services/FindAllMoviesService';
import FindOneMovieService from '../services/FindOneMovieService';
import DeleteMovieService from '../services/DeleteMovieService';

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

  public async findOne(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findOneMovies = new FindOneMovieService();

    const movie = await findOneMovies.execute({ id });

    return response.json(movie);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteMovie = new DeleteMovieService();

    await deleteMovie.execute({ id });

    return response.json({ deleted: true });
  }
}

export default MoviesController;
