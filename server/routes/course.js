import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createCourse } from '../controllers/course.js';

const router = express.Router();

router.route("/").post(isAuthenticated,createCourse);

export default router; 