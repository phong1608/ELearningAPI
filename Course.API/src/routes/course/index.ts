import express from 'express'
import CourseController from '../../controllers/course.controller'
import authMiddleware from '../../middlewares/auth.middleware'
const router = express.Router()



router.post('/course',authMiddleware.verifyUser,CourseController.createCourse)
router.post('/course/publish/:id',CourseController.PublishCourse)
router.get('/course',CourseController.GetPublishedCourse)
router.get('/course/:id',CourseController.GetCourseById)
export default router 