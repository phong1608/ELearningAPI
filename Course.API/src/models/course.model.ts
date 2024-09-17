import {Schema,Types,model} from "mongoose";
import { Course } from "../types/course.type";
const DOCUMENT_COLLECTION = "Courses"
const DOCUMENT_NAME ="Course" 



const courseModel = new Schema({
    title:{type:String, require:true},
    description:{type:String, require:true},
    category:{type:Array, require:true},
    instructor_id:{type:Types.ObjectId, require:true},
    price:{type:Number,require:true},
    isPublished:{type:Boolean, require:true,default:false},
    sections: [{
        type: Types.ObjectId,
        ref: 'Section' 
      }]


},{
    timestamps:true,
    collection:DOCUMENT_COLLECTION
})


export default model<Course>(DOCUMENT_NAME,courseModel)

