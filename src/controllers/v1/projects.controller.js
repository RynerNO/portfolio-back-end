import Project from '@models/Project';
import fs from 'fs';
import webp from 'webp-converter';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import rmdir from 'rimraf';
import captureWebsite from 'capture-website';

const getProjects = async (req, res) => {
  console.log(`Projects req:${req.body$}`)
  const { projectID } = req.body
  if(!projectID) {
    const projects = await Project().find();
    return res.status(200).json({
      projects
    });
  } else {
    const project = await Project().findOne({
      projectID: projectID
    });
    return res.status(200).json({
      project
    });
  }
 
};

const addProject = async (req, res) => {
  console.log(`Projects req:${req.body$}`)
  let { Title, Tech, Git, Link, Pages, projectID } = req.body;
  let update = false
  try {
    if(!projectID) {
      projectID = uuidv4()
    } else update = true
    if(update) {
      const deleteFolder = new Promise((resolve, reject) => {
        rmdir(path.resolve('dist', `public/posters/${projectID}`), function (error) {
          if (error) {
            reject(error)

          }
          resolve()
        });
      } )
      await deleteFolder;
    }
    await fs.promises.mkdir(path.resolve('dist', `public/posters/${projectID}`), { recursive: true })
    
    await captureWebsite.file(Link, path.resolve('dist', `public/posters/${projectID}`, 'poster.png'), {
      launchOptions: {
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      }
    });
    await webp.cwebp(path.resolve('dist', `public/posters/${projectID}`, 'poster.png'), path.resolve('dist', `public/posters/${projectID}/poster.webp`), "-q 90");
    if(!update) {
    await Project().create({
      title: Title,
      tech: Tech,
      git: Git,
      pages: Pages,
      link: Link,
      projectID: projectID
    })
    } else {
      await Project().updateOne({ projectID }, {
        title: Title,
        tech: Tech,
        git: Git,
        pages: Pages,
        link: Link,
        projectID: projectID
      })
    }
    return res.status(200).json({
      message: 'Success'
    });
}
  catch (e) { 
    console.log(e)
    return res.status(400).json({
      message: 'Error',
      error: e.message
    });
  }
}

const deleteProject = async (req, res) => {
  console.log(`Projects req:${req.body$}`)
  const { projectID } = req.body;
  try { 
    await Project().deleteOne({ projectID })
    rmdir(path.resolve('dist', `public/posters/${projectID}`), function (error) {
      if (error) {
        console.error(error)
      }
    });
    return res.status(200).json({
      message: 'Success'
    })
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      message: 'failed',
      error: e.message
    })
  }

}
export default {
  getProjects,
  addProject,
  deleteProject,
}
