import OrderService from "../services/order.service";
import {  Request,Response } from "express";



class OrderController{
    addNewOrder = async(req:Request, res:Response)=>{
        if(!req.user)
        {
            throw new Error("")
        }
        return res.status(201).json({message:"Order added ",metadata: await OrderService.addOrder(req.user?.userId,req.body)})
    }
}
export default new OrderController()