import CartService from "../services/cart.service";
import { Request, Response } from "express";


class CartController{
    addNewCart = async(req:Request,res:Response)=>{
        if(!req.user)
            throw new Error("you must be logged in")
        return res.json({
            message:"New Cart Added",
            metadata:await CartService.addToCart(req.user.userId,req.body)
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

}

export default new CartController()