import Discount from "../interfaces/discount.interface";
import { pool } from "../db/db.connection";
import { publishDirectMessage } from "../queues/producer";
import { DiscountChannel } from "../server";
import { map } from "lodash";
interface IDiscountObjectKeys {
    [key: string]: string | number | Date | undefined;
  }
const objKeys:IDiscountObjectKeys = {
    type:"type",
    amount:"amount",
    course_id:"course_id",
    valid_to:"valid_to"
}

const addDiscount = async ({type,amount,course_id,valid_to}:Discount)=>
{
    const {rows} =await  pool.query(`INSERT INTO discount(type,amount,course_id,valid_to) VALUES($1,$2,$3,$4) RETURNING *`,[type,amount,course_id,valid_to])
    const result:Discount = Object.fromEntries(
        Object.entries(rows[0]).map(([key, value]) => [objKeys[key] || key, value])
    )
    return result
}
const getDiscountByCoupon = async (coupon:string)=>{
    const {rows} = await pool.query(`SELECT * FROM discount WHERE discount.coupon = $1 LIMIT 1`,[coupon])
    const result:Discount = Object.fromEntries(
        Object.entries(rows[0]).map(([key, value]) => [objKeys[key] || key, value])
    )
    return result

}   
const getDiscountByCourseId = async(course_id:string)=>{
    const discounts= await pool.query(`SELECT * FROM discount WHERE discount.course_id = $1 `,[course_id])
    const mappedResult: Discount[] = map(discounts.rows, (key) => {
        return Object.fromEntries(
          Object.entries(key).map(([key, value]) => [objKeys[key] || key, value])
        )})
    return mappedResult

}
const publicDiscountById=async(discount_id:string)=>
{
    const {rows} = await pool.query(`UPDATE discount SET public=true WHERE id = $1 RETURNING *`, [discount_id])
    const result:Discount = Object.fromEntries(
        Object.entries(rows[0]).map(([key, value]) => [objKeys[key] || key, value])
    )
    const exchangeName="DiscountAddedExchange"
    const routingKey="add-discount"
    const message =  {
        "type": result.type,
        "amount": result.amount,
        "course_id": result.course_id,
        "valid_to": result.valid_to
    }
    await publishDirectMessage(DiscountChannel,exchangeName,routingKey,JSON.stringify(message))
    return result
}



export {addDiscount,getDiscountByCoupon,getDiscountByCourseId,publicDiscountById}