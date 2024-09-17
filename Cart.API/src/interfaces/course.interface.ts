import { Types } from "mongoose";

export interface Course{
    course_id:Types.ObjectId,
    price:number,
    coupon:string
    
}