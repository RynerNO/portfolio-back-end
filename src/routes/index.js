import { Router } from 'express';

import authRouter from './v1/auth';

import projectsRouter from './v1/projects'

import mailRouter from './v1/mail'


const v1Router = new Router();


v1Router.use('/api/v1/auth', authRouter);
v1Router.use('/api/v1/projects', projectsRouter);
v1Router.use('/api/v1/mail', mailRouter)

export default v1Router;
