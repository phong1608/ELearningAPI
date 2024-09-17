import { Types,Document } from "mongoose";



export default interface Lesson extends Document{
    title:string,
    video_url:string,
    duration:string
    section_id:Types.ObjectId,
    order:number,
    isPreview:boolean

    
}