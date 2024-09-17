import express from "express"
import cartController from "../controllers/cart.controller"
import authMiddleware from "../middlewares/auth.middleware"
const router = express.Router()


router.post('/cart',authMiddleware.verifyUser,cartController.addNewCart)
router.post('/cart/:id',authMiddleware.verifyUser,cartController.removerFromCart)
router.get('/cart',authMiddleware.verifyUser,cartController.getUserCart)

export default router