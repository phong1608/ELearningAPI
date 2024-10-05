import express, { Request, Response } from "express";
import discountController from "../controllers/discount.controller";
const router = express.Router();
router.get('/',(_req:Request,res:Response)=>{
     res.send("Hello world")
})
router.post('/discount',discountController.addNewDiscount as any)
router.get('/discount/coupon=:coupon',discountController.getDiscountByCoupon as any)
router.get('/discount/course=:courseId',discountController.getDiscountByCourseId as any)
router.post('/discount/publish/:id',discountController.publicDiscountById as any)
export default router