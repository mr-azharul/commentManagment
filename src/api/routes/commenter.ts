import { Container } from 'typedi';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import CommenterService from '../../services/commenter';
import { IUserInputDTO } from '../../interfaces/User';
import { Router, Request, Response, NextFunction } from 'express';

const route = Router();

export default (app: Router) => {
  app.use('/commenter', route);

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
        const commenterInstance = Container.get(CommenterService);
        const { user } = await commenterInstance.SignUp(req.body as IUserInputDTO);
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
        const commenterInstance = Container.get(CommenterService);
        const { user } = await commenterInstance.SignIn(email, password);
        return res.json({ user }).status(200);
      } catch (e) {
        return next(e);
      }
    },
  );
};