import { orderChannel } from '../server';
import { publishDirectMessage } from "../queues/producer";
import { Types } from "mongoose";
import OrderRepository from "../repository/order.repository";
import Order from "../interfaces/order.interface";
import UserCourse from '@order/interfaces/user-course.interface';


class OrderService
{
    static async addOrder(user_id:Types.ObjectId,order:Order)
    {
        const newOrder= await OrderRepository.AddNewOrder(user_id, order)
        const exchangeName="usercourse-exchange"
        const routingKey="usercourse"
        
        const message:UserCourse = {user:newOrder.user,courses:newOrder.course.map(c=>c.id)} as UserCourse
        await publishDirectMessage(orderChannel,exchangeName,routingKey,JSON.stringify(message))
        console.log(message)
        return newOrder
    }
}
export default OrderService