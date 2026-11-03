import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './auth';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRouter) //All authentication related routes.

export default app;
