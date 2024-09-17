import {Schema ,Types, model} from "mongoose"

const DOCUMENT_NAME="User"
const DOCUMENT_COLLECTION="Users"


const userSchema  = new Schema({
    firstName: {type:String,required:true},
    lastName: {type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    verify:{type:Boolean,default:false},
    profile_picture:{type:String},
    user_type:{type:String,enum:['learner','instructor']}
},{
    timestamps:true,
    collection:DOCUMENT_COLLECTION
})
export default model(DOCUMENT_NAME,userSchema)


