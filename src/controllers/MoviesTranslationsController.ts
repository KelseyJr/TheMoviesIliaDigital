import { Request, Response } from 'express';
import SetMovieTranslationService from '../services/SetMovieTranslationService';

class MoviesTranslationsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const setMovieTranslation = new SetMovieTranslationService();

    const movie = await setMovieTranslation.execute({ id });

    return response.json(movie);
  }
}

export default MoviesTranslationsController;
