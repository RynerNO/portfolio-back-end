import jwt from 'jsonwebtoken';

import User from '@models/User';

import config from '@config';
export default async (req, res, next) => {
  try {
    const token = req.headers.access_token;

    const data = jwt.verify(token, config.jwtSecret);

    const user = await User().findById(data);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    return next();
  } catch (error) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>\n' + error);
    return res.status(400).json({
      message: 'Unauthenticated.'
    });
  }
};
