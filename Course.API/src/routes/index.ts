import express from "express"
import CourseRouter from "./course/index"
import SectionRouter from "./section/index"
import LessonRouter from "./lesson/index"
const router= express.Router();

router.use('/api/v1/',CourseRouter)
router.use('/api/v1/',SectionRouter)
router.use('/api/v1/',LessonRouter)
export default router