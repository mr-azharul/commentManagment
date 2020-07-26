import { Container } from 'typedi';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import BloggerService from '../../services/blogger';
import { IUserInputDTO } from '../../interfaces/User';
import { Router, Request, Response, NextFunction } from 'express';

const route = Router();

export default (app: Router) => {
  app.use('/blogger', route);

  route.post('/signup',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const BloggerServiceInstance = Container.get(BloggerService);
        const { user } = await BloggerServiceInstance.SignUp(req.body as IUserInputDTO);
        return res.status(201).json({ user });
      } catch (e) {
        return next(e);
      }
    },
  );

  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = req.body;
        const BloggerServiceInstance = Container.get(BloggerService);
        const { user } = await BloggerServiceInstance.SignIn(email, password);
        return res.json({ user }).status(200);
      } catch (e) {
        return next(e);
      }
    },
  );
};