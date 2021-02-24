import { Router } from 'express';

import mailController from '@controllers/v1/mail.controller';
import messageValidator from '@validators/messageValidator'

const mailRouter = new Router();

mailRouter.post('/send', messageValidator, mailController.send);

export default mailRouter;
