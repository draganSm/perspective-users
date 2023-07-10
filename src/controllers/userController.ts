import { Request, Response, Router } from 'express';
import { repositoryFactory } from '../dataAccessLayer/repositoryFactory';
import { UsersRepository } from '../dataAccessLayer/usersRepository';
import { HttpStatusCode } from '../common/constants';
import { User } from '../models/user';
import { userSchema } from '../validations/userValidation';
import { BaseFields, SortOrder } from '../types';
import Logger from '../common/logger';
import { ZodError } from 'zod';
import { DatabaseError } from 'pg';
import { validationToAppError } from '../common/validationToAppError';

const USER_EMAIL_UNIQUE = 'user_email_unique';

const log = Logger('userController');

const getAll = async (req: Request<{}, {}, { created: SortOrder }>, res: Response) => {
  const { created } = req.query;
  const sortOrder = created === 'desc' ? 'desc' : 'asc';
  try {
    const users = await repositoryFactory.get(UsersRepository).getAll(sortOrder);
    res.status(HttpStatusCode.OK).send(users);
  } catch (err) {
    log.error(err);
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: err.message, type: err.constructor.name });
  }
};

const addUser = async (req: Request<{}, {}, Omit<User, BaseFields>>, res: Response) => {
  const newUser = req.body;
  try {
    userSchema.parse(newUser);
    await repositoryFactory.get(UsersRepository).add(newUser);
    res.status(201).send({});
  } catch (err) {
    log.error(err);
    if (err instanceof ZodError) {
      res
        .status(HttpStatusCode.BAD_REQUEST)
        .send({ message: 'Validation Failed', error: validationToAppError(err.errors) }); // validationToAppError
    } else if (err instanceof DatabaseError && err.constraint === USER_EMAIL_UNIQUE) {
      res.status(HttpStatusCode.BAD_REQUEST).send({
        message: 'Validation Failed',
        error: {
          email: ['Already exists'],
        },
      });
    } else {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ message: err.message, type: err.constructor.name });
    }
  }
};

export const userRouter = Router();
userRouter.post('/', addUser);
userRouter.get('/', getAll);
