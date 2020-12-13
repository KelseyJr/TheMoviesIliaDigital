import { Router } from 'express';

import MoviesTranslationsController from '../controllers/MoviesTranslationsController';

const moviesTranslationsController = new MoviesTranslationsController();
const moviesTranslationsRouter = Router();

moviesTranslationsRouter.patch('/', moviesTranslationsController.update);

export default moviesTranslationsRouter;
