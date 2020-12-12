import { Request, Response } from 'express';
import CreateMovieService from '../services/CreateMovieService';

class MoviesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { movieId } = request.body;

    const createMovie = new CreateMovieService();

    const movie = await createMovie.execute({ movieId });

    return response.json(movie);
  }
}

export default MoviesController;
