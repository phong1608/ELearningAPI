import { Cart } from "@cart/interfaces/cart.interface";
import {model,Schema,Types} from 'mongoose'
const DOCUMENT_NAME="Cart"
const COLLECTION_NAME="Carts"


const cartModel = new Schema({
    user:{type:Types.ObjectId,require:true,unique:true},
    courses:{type:[]},
    price:{type:Number,default:0}

},{
    timestamps:true,
    collection:COLLECTION_NAME
})
export default model<Cart>(DOCUMENT_NAME,cartModel)



