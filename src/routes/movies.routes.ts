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
moviesRouter.put(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().required().strict(true) } }),
  moviesController.update,
);
moviesRouter.get('/', moviesController.findAll);
moviesRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().required().strict(true) } }),
  moviesController.findOne,
);
moviesRouter.delete(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().required().strict(true) } }),
  moviesController.delete,
);

export default moviesRouter;
