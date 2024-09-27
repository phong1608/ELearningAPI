import User from "@course/interfaces/user.interface";
import {Schema,Types,model} from "mongoose";
const DOCUMENT_COLLECTION = "User"
const DOCUMENT_NAME ="User" 


const userModel = new Schema({
    user:{type:Types.ObjectId,required:true},
    courses: [{
        courseId: { type: Types.ObjectId, ref: "courses", required: true },
        rating: { type: Number, default: 0 }
      }]
},{
    timestamps:true,
    collection:DOCUMENT_COLLECTION
})


export default model<User>(DOCUMENT_NAME,userModel)