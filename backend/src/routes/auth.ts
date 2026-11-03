import express from 'express';
import { registerUser, loginUser } from '../controllers/auth';
import {verify_login} from '../middleware/auth_middleware';

const authRouter = express.Router();


authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);


export default authRouter;