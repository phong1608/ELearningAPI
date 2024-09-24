import { Types } from "mongoose";

export interface Course{
    _id:Types.ObjectId,
    title:String,
    category:String[],
    instructor_id:String,
    price:number,
    coupon:string
    
}