import express from 'express';
import ReviewController from '../controllers/review.controller';
import AuthMiddleware from "../middlewares/auth.middleware"
const router = express.Router()


router.post('/review',AuthMiddleware.verifyUser as any,ReviewController.addReview as any)


export default router