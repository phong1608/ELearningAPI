import {Schema,Types, model} from "mongoose"
import Order from "../interfaces/order.interface"
const DOCUMENT_NAME:string="Order"
const COLLECTION_NAME:string="Orders"

const orderModel = new Schema({
    user:{type:Types.ObjectId,required:true},
    payment_method:{type:String,required:true,enum:["visa","paypal","credit card"]},
    course:[],
    original_price:{type:Number,required:true},
    total_discount:{type:Number,required:true,default:0}
},{
    timestamps:true,
    collection:COLLECTION_NAME
})


export default model<Order>(DOCUMENT_NAME,orderModel)