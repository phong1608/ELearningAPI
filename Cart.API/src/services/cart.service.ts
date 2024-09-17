import cartModel from "../models/cart.model";
import { Types } from "mongoose";
import { Course } from "../interfaces/course.interface";


class CartService{


    static async addToCart(user_id:Types.ObjectId,{course_id,price,coupon}:Course)
    {
        const userCart = await cartModel.findOne({user:user_id})

        if(userCart?.courses.some(c=>c.course_id==course_id))
        {
            throw new Error("This course is already in cart")
        }
        
        const updatedCart = await cartModel.findOneAndUpdate({user:user_id}, {$push:{courses:{course_id,price,coupon}}},{upsert:true,new:true})
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
        if(!userCart?.courses.some(c=>c.course_id?.toString()==course_id))
        {
            throw new Error("This course is not in cart")
        }
        const updatedCart = await cartModel.findOneAndUpdate(
            { user: user_id },
            { $pull: { courses: { course_id } } },
            { new: true } // Return the updated cart with the course removed
          );
        return updatedCart
    }
    static async GetUserCart(user_id:Types.ObjectId)
    {
        return await cartModel.findOne({user:user_id})
        
    }
}

export default CartService