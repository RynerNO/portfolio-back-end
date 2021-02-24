import { Router } from 'express';
import authMiddleware from '@middleware/auth'
import controller from '@controllers/v1/projects.controller';
const router = new Router();

router.get('/get', controller.getProjects)
router.post('/get', controller.getProjects)
router.post('/add', authMiddleware, controller.addProject)
router.post('/delete', authMiddleware, controller.deleteProject)
export default router;
