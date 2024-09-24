import CartService from "../services/cart.service";
import { Request, Response } from "express";


class CartController{
    addNewCart = async(req:Request,res:Response)=>{
        if(!req.user)
            throw new Error("you must be logged in")
        return res.json({
            message:"New Cart Added",
            metadata:await CartService.addToCart(req.user.userId.toString(),req.body)
        })
    }
    removerFromCart = async(req:Request,res:Response)=>{
        if(!req.user)
            throw new Error("you must be logged in")
        return res.json({
            message:"New Cart Added",
            metadata:await CartService.removeCourseFromCart(req.user.userId,req.params.id)
        })
    }
    getUserCart =async(req:Request,res:Response)=>{
        if(!req.user)
            throw new Error("you must be logged in")
        return res.json({
            message:"New Cart Added",
            metadata:await CartService.GetUserCart(req.user.userId)
        })
    }
    checkOut = async(req:Request,res:Response)=>{
        if(!req.user)
            throw new Error("you must be logged in")
        return res.json({
            message:"Cart Checked Out",
            metadata:await CartService.Checkout(req.user.userId,req.body.payment_method)
        })
    }

}

export default new CartController()