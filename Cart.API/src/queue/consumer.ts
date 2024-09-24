import { Channel,Replies,ConsumeMessage } from "amqplib";
import createConnection from "./rabbitmq.connection";
import CartService from "../services/cart.service";
const consumeAddToCartMessage = async (channel: Channel): Promise<void> => {
    
    if (!channel) {
    channel = (await createConnection()) as Channel;
    }
    const exchangeName="cart-exchange"
    const routingKey="add-to-cart"
    const queueName = 'add-to-cart-queue';
    await channel.assertExchange(exchangeName, 'direct');
    const jobberQueue: Replies.AssertQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(jobberQueue.queue, exchangeName, routingKey);
    channel.consume(jobberQueue.queue, async (msg: ConsumeMessage | null) => {
        const message = JSON.parse(msg!.content.toString());
        await CartService.addToCart(message.user,message.course)
    },{
        noAck:true
    });
    
  };

export {consumeAddToCartMessage}

