import sectionController from "../../controllers/section.controller";
import express from 'express'

const router = express.Router();


router.post('/section',sectionController.AddSection)
router.get('/section/:id',sectionController.GetAllSectionByCourse)
export default router

