import { Types } from "mongoose";
import orderModel from "../models/order.model";
import Order from "../interfaces/order.interface";


class OrderRepository{
    static async AddNewOrder(user_id:Types.ObjectId,order:Order)
    {
        order.user = user_id;
        order.total_price = order.original_price-order.total_discount
        const newOrder = new orderModel(order)
        return newOrder.save()
    }
}
export default OrderRepository