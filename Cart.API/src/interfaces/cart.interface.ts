import { Document, Types } from "mongoose";
import { Course } from "./course.interface";



export interface Cart extends Document{
    user: Types.ObjectId,
    courses: Course[],
    price:number


}