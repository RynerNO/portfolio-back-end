import Express from 'express';

import Mongoose from 'mongoose';

import config from '@config';

import v1Router from '@routes';

import dotenv from 'dotenv';

import path from 'path';

import BodyParser from 'body-parser';

import compression from 'compression';
import cors from 'cors';

import Project from '@models/Project';
import fs from 'fs';
import webp from 'webp-converter';
import rmdir from 'rimraf';
import captureWebsite from 'capture-website';

dotenv.config();
Mongoose.connect(config.databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const app = Express();

app.use(cors({
  origin: 'https://ryner.xyz'
}))
app.use(BodyParser.json());

app.use(compression());



app.use(Express.static(path.resolve('dist', 'public')));
app.use(v1Router)
app.use("*", (req, res) => {
  console.log(req.body)
  
})


async function isFileExist(path) {
     try {
       const isExist = await fs.promises.stat(path)
       return true
     } catch(e) {
       if(e.code == "ENOENT") return false
     }
}
// Check public files
 // Restore posters
async function start() {
  const projects = await Project().find()
  for(let project of projects) {
      const projectID = project.projectID;
      const Link = project.link
      const isExist = await isFileExist(path.resolve('dist', `public/posters/${projectID}/poster.webp`))
      console.log(isExist)
      if(isExist) continue;
      console.log(`Poster file for ${project.title} is missing`)
      const deleteFolder = new Promise((resolve, reject) => {
      rmdir(path.resolve('dist', `public/posters/${projectID}`), function (error) {
        if (error) {
          reject(error)

        }
        resolve()
      });
    } )
    await deleteFolder;
    await fs.promises.mkdir(path.resolve('dist', `public/posters/${projectID}`), { recursive: true })
    
    await captureWebsite.file(Link, path.resolve('dist', `public/posters/${projectID}`, 'poster.png'), {
      launchOptions: {
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      }
    });
    await webp.cwebp(path.resolve('dist', `public/posters/${projectID}`, 'poster.png'), path.resolve('dist', `public/posters/${projectID}/poster.webp`), "-q 90");
    console.log(`Poster file for ${project.title} restored`)
  }

  app.listen(config.port, async () => {
    console.log(`SERVER RUNNING ON PORT: ${config.port}`);
  });
}



start()