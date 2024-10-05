import cartModel from "../models/cart.model";
import { Types } from "mongoose";
import { Course } from "../interfaces/course.interface";
import { publishDirectMessage } from "../queue/producer";
import Checkout from "../interfaces/checkout.interface";
import {CartChannel} from "../server"
class CartService{


    static async addToCart(user_id:string,{id,price,instructor_name,title,category,instructor_id}:Course)
    {
        const userCart = await cartModel.findOne({user:user_id})

        if(userCart?.courses.some(c=>c.id==id))
        {
            throw new Error("This course is already in cart")
        }
        
        const updatedCart = await cartModel.findOneAndUpdate({user:user_id}, {$push:{courses:{id,price,instructor_name,title,category,instructor_id}}},{upsert:true,new:true})
        const totalPrice = updatedCart.courses.reduce((total, course) => total + course.price, 0);

        updatedCart.price = totalPrice;
        
        return await updatedCart.save();
    }
    static async removeCourseFromCart(user_id:Types.ObjectId,course_id:string)
    {
        const userCart = await cartModel.findOne({user:user_id})
        if(!userCart)
        {
            throw new Error("User's Cart is empty")
        }
        if(!userCart?.courses.some(c=>c.id?.toString()==course_id))
        {
            throw new Error("This course is not in cart")
        }
        const updatedCart = await cartModel.findOneAndUpdate(
            { user: user_id },
            { $pull: { courses: { course_id } } },
            { new: true } 
          );
        return updatedCart
    }
    static async GetUserCart(user_id:Types.ObjectId)
    {
        return await cartModel.findOne({user:user_id})
        
    }
    static async Checkout(user_id:Types.ObjectId,payment_method:String="visa")
    {
        const userCart = await cartModel.findOne({user:user_id});
        if(!userCart)
        {
            throw new Error("Your cart is empty")
        }
        const checkOut:Checkout = {user:user_id,course:userCart.courses,original_price:userCart.price,total_discount:0,payment_method:payment_method} as Checkout
        const message = JSON.stringify(checkOut)
        const exchangeName="checkout-exchange"
        const routingKey="checkout"
        await publishDirectMessage(CartChannel,exchangeName,routingKey,message)

    }
}

export default CartService