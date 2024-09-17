import lessonController from "../../controllers/lesson.controller";
import express from 'express'

const router = express.Router();
router.post('/lesson',lessonController.AddLesson)
router.get('/lesson/:id',lessonController.GetLessonById)

export default router