import User from "@course/interfaces/user.interface";
import {Schema,Types,model} from "mongoose";
const DOCUMENT_COLLECTION = "User"
const DOCUMENT_NAME ="User" 


const userModel = new Schema({
    user:{type:Types.ObjectId,required:true},
    courses:{type:Array<Types.ObjectId>,ref:"courses",required:true}
},{
    timestamps:true,
    collection:DOCUMENT_COLLECTION
})


export default model<User>(DOCUMENT_NAME,userModel)