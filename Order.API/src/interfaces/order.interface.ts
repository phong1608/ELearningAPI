import { Types } from "mongoose";
import Course from "./course.interface";
export default interface Order{
    user:Types.ObjectId,
    course:Course[],
    payment_method:String,
    original_price:number,
    total_discount:number,
    total_price:number
}