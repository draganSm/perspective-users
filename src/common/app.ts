import express, { Express } from 'express';
import cors from 'cors';
import { userRouter } from '../controllers/userController';

export const app: Express = express();
app.use(cors()).use(express.json()).options('*', cors());

app.use('/users', userRouter);
