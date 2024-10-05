import {Types} from "mongoose"

export default interface Course{

    id:string,
    price:number,
    coupon:string,
    title:string,
    category:string[],
    instructor_id:Types.ObjectId

}