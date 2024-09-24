import {Types} from "mongoose"

export default interface Course{

    _id:Types.ObjectId,
    price:number,
    coupon:string,
    title:string,
    category:string[],
    instructor_id:Types.ObjectId

}