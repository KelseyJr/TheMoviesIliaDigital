import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import MoviesController from '../controllers/MoviesController';

const moviesController = new MoviesController();
const moviesRouter = Router();

moviesRouter.post(
  '/',
  celebrate({ [Segments.BODY]: { movieId: Joi.number().required().strict(true) } }),
  moviesController.create,
);

moviesRouter.get('/', moviesController.findAll);
moviesRouter.get('/:id', moviesController.findOne);

export default moviesRouter;
