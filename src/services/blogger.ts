import userModel from '../models/blogger';
import logger from '../loaders/logger';
import { Service, Inject } from 'typedi';
import { IUser, IUserInputDTO } from '../interfaces/User';

@Service()
export default class AuthService {
  constructor() {}

  public async SignUp(userInputDTO: IUserInputDTO): Promise<{ user: IUser }> {
    try {
      const userRecord = await userModel.create({
        ...userInputDTO,
        password: userInputDTO.password,
      });

      if (!userRecord) {
        throw new Error('User cannot be created');
      }

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');

      return { user };
    } catch (e) { 
      logger.error(e);
      throw e;
    }
  }

  public async SignIn(email: string, password: string): Promise<{ user: IUser }> {
    const userRecord = await userModel.findOne({ email });
    if (!userRecord) {
      logger.error('User not registered');
      throw new Error('User not registered');
    }

    if (userRecord.password == password) {
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');

      return { user };
    } else {
      logger.error('Invalid Password');
      throw new Error('Invalid Password');
    }
  }
}