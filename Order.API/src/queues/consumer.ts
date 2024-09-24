import { Channel,Replies,ConsumeMessage } from "amqplib";
import createConnection from "./rabbitmq.connection";
import OrderService from "../services/order.service";
const consumeCheckoutMessage = async (channel: Channel): Promise<void> => {
    
    if (!channel) {
    channel = (await createConnection()) as Channel;
    }
    const exchangeName="checkout-exchange"
    const routingKey="checkout"
    const queueName = 'cart-checkout';
    await channel.assertExchange(exchangeName, 'direct');
    const orderQueue: Replies.AssertQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(orderQueue.queue, exchangeName, routingKey);
    channel.consume(orderQueue.queue, async (msg: ConsumeMessage | null) => {
        const message = JSON.parse(msg!.content.toString());
        await OrderService.addOrder(message.user,message)
    },{
        noAck:true
    });
    
  };

export {consumeCheckoutMessage}

