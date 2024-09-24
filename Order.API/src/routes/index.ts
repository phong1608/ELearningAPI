import express from "express"
import orderController from "../controllers/order.controller"
import AuthMiddlware from "../middlewares/auth.middleware"
const router = express.Router()



router.post('/',AuthMiddlware.verifyUser,orderController.addNewOrder)


export default router