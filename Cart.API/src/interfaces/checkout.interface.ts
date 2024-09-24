import { Types } from "mongoose";
import { Course } from "./course.interface";


export default interface Checkout{
    user:Types.ObjectId,
    course:Course[],
    original_price:number,
    payment_method:string
    total_discount:number,


}