import {model,Schema,Types} from "mongoose"
import Section from "../types/section.type"
const DOCUMENT_NAME:string = "Section"
const DOCUMENT_COLLECTION:string = "Sections"


const sectionSChema:Schema = new Schema({
    title:{type:String,require:true},
    course:{type:Types.ObjectId,ref:"Course",require:true},
    order:{type:Number,require:true,unique:true},
    lessons:[{type:Types.ObjectId,ref:"Lesson"}]

},{
    timestamps:true,
    collection:DOCUMENT_COLLECTION
})


export default model<Section>(DOCUMENT_NAME,sectionSChema)

