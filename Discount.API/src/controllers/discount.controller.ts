import { addDiscount,getDiscountByCoupon,getDiscountByCourseId, publicDiscountById } from "../services/discount.service";
import { Request, Response } from "express";



class DiscountController{
    addNewDiscount = async (req:Request,res:Response)=>{
        return res.status(201).json({
            message:"New discount added",
            metadata:await addDiscount(req.body)
        })
    }
    getDiscountByCoupon = async (req:Request, res:Response)=>{
        return res.status(200).json({
            message:"Discount get",
            metadata:await getDiscountByCoupon(req.params.coupon)
        })
    }
    getDiscountByCourseId= async(req:Request, res:Response)=>{
        return res.status(200).json({
            message:"Discount get",
            metadata:await getDiscountByCourseId(req.params.courseId)
        })
    }
    publicDiscountById = async(req:Request, res:Response)=>{
        return res.status(200).json({
            message:"Discount published",
            metadata:await publicDiscountById(req.params.id)
        })
    }
}
export default new DiscountController()