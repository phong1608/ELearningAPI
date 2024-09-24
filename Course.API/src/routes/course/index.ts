import express from 'express'
import CourseController from '../../controllers/course.controller'
import authMiddleware from '../../middlewares/auth.middleware'
const router = express.Router()



router.post('/course',authMiddleware.verifyUser,CourseController.createCourse)
router.post('/course/publish/:id',CourseController.PublishCourse)
router.post('/add-to-cart/:id',authMiddleware.verifyUser,CourseController.addToCart)
router.get('/course',CourseController.GetPublishedCourse)
router.get('/course/:title',CourseController.GetCourseById)
export default router 