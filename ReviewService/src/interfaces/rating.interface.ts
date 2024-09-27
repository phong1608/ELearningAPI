import { Types } from "mongoose";

export default interface Rating{
    user: Types.ObjectId,
    course_id: Types.ObjectId,
    rating:number
}