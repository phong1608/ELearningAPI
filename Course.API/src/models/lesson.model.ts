import {Schema,Types,model} from "mongoose"
import Lesson from "../types/lesson.type"
const DOCUMENT_NAME="Lesson"
const DOCUMENT_COLLECTION="Lessons"


const lessonModel = new Schema({
    title:{type:String,require:true},
    video_url:{type:String,require:true},
    duration:{type:String,require:true},
    section:{type:Types.ObjectId,require:true,ref:"Section"},
    order:{type:Number,require:true,unique:true},
    isPreview:{type:Boolean,default:false}

},{
    timestamps:true,
    collection:DOCUMENT_COLLECTION
})


export default model<Lesson>(DOCUMENT_NAME,lessonModel)