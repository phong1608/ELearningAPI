import { Channel,Replies,ConsumeMessage } from "amqplib";

import createConnection from "./rabbitmq.connection";
import UserService from "../services/user.service";


const consumeAddUserCourseMessage = async(channel:Channel)=>
{
    
    if (!channel) {
        channel = (await createConnection()) as Channel;
        }
        const exchangeName="usercourse-exchange"
        const routingKey="usercourse"
        const queueName = 'usercourse-queue';
        await channel.assertExchange(exchangeName, 'direct');
        const orderQueue: Replies.AssertQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
        await channel.bindQueue(orderQueue.queue, exchangeName, routingKey);
        channel.consume(orderQueue.queue, async (msg: ConsumeMessage | null) => {
            const message = JSON.parse(msg!.content.toString());
            await UserService.AddUserCourse(message)
        },{
            noAck:true
        });
        

}

const consumeAddUserRatingMessage = async(channel:Channel)=>
    {
        
        if (!channel) {
            channel = (await createConnection()) as Channel;
        }
        const exchangeName ="review-exchange"
        const routingKey="new-review"
        const queueName = 'rating-queue';
        await channel.assertExchange(exchangeName, 'direct');
        const orderQueue: Replies.AssertQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
        await channel.bindQueue(orderQueue.queue, exchangeName, routingKey);
        channel.consume(orderQueue.queue, async (msg: ConsumeMessage | null) => {
            const message = JSON.parse(msg!.content.toString());
            await UserService.AddUserCourse(message)
        },{
            noAck:true
        });
            
    
    }
export {consumeAddUserCourseMessage,consumeAddUserRatingMessage}