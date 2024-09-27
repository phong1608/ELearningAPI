import {Types,model,Schema} from "mongoose"
import Review from "../interfaces/review.interface"
const COLLECTION_NAME="Reviews"
const DOCUMENT_NAME="Review"

const reviewModel = new Schema({
    reviewer_id:{type:Types.ObjectId,required:true},
    reviewer_name:{type:String,required:true},
    course_id:{type:Types.ObjectId,required:true},
    rating:{type:Number,required:true},
    review:{type:String,require:true}

},{
    timestamps:true,
    collection:COLLECTION_NAME
})

export default model<Review>(DOCUMENT_NAME,reviewModel)