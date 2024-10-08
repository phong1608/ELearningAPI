import { Document, Types } from "mongoose";


export default interface Review extends Document{
    reviewer_id:Types.ObjectId,
    reviewer_name:String,
    course_id:string,
    rating:number,
    review:string
}