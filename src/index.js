import Express from 'express';

import Mongoose from 'mongoose';

import config from '@config';

import v1Router from '@routes';

import dotenv from 'dotenv';

import path from 'path';

import BodyParser from 'body-parser';

import axios from 'axios'

import compression from 'compression';
import cors from 'cors';

dotenv.config();
Mongoose.connect(config.databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const app = Express();

app.use(cors({
  origin: 'https://ruiner.xyz',
}))
app.use(BodyParser.json());

app.use(compression());

app.use(v1Router);

app.use(Express.static(path.resolve('dist', 'public')));

app.listen(config.port, () => {
  console.log(`SERVER RUNNING ON PORT: ${config.port}`);
  // HEROKU DYNO ANTI-SLEEP
  setInterval(() => {
    axios.get('https://portfolio-ruiner.herokuapp.com/').then(() => {}).catch(() => {})
  }, 1000*60*25)
});
