import { Router } from 'express';

import authController from '@controllers/v1/auth.controller';

import loginValidator from '@validators/login';

const authRouter = new Router();

authRouter.post('/login', loginValidator, authController.login);

export default authRouter;
