import { Types,Document } from "mongoose";

export default interface Section extends Document{
    title:string;
    course_id:Types.ObjectId;
    order:number;
}
