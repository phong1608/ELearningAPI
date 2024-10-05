import express from 'express'
import AuthMiddleware from '../../middlewares/auth.middleware'
import UserController from '../../controllers/user.controller'

const router = express.Router()
router.get('/course/user/:id',AuthMiddleware.verifyUser,UserController.GetUserCourse)