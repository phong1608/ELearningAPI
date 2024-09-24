import {Channel,Replies,ConsumeMessage} from "amqplib"
import createConnection from "../queues/rabbitmq.connection";


const consumeOrderDirectMessage = async (channel: Channel): Promise<void> => {
    
      if (!channel) {
        channel = (await createConnection()) as Channel;
      }
      const exchangeName = 'new-order-added';
      const routingKey = 'add-order';
      const queueName = 'add-order-queue';
      await channel.assertExchange(exchangeName, 'direct');
      const orderQueue: Replies.AssertQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
      await channel.bindQueue(orderQueue.queue, exchangeName, routingKey);
      channel.consume(orderQueue.queue, async (msg: ConsumeMessage | null) => {
        channel.ack(msg!);
      });
    
  };

export {consumeOrderDirectMessage}