import { Types,Document } from "mongoose"

export interface Course extends Document{
    title:string,
    title_slug:string,
    description:string,
    category:Array<string>,
    instructor_id:Types.ObjectId,
    price:number,
    isPublished:boolean
}