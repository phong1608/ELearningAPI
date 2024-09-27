import { Channel } from "amqplib";
import createConnection from"./rabbitmq.connection"
const publishDirectMessage = async (
    channel: Channel,
    exchangeName: string,
    routingKey: string,
    message: string
  ): Promise<void> => {
    try {
      if (!channel) {
        channel = await createConnection() as Channel;
      }
      await channel.assertExchange(exchangeName, 'direct');
      channel.publish(exchangeName, routingKey, Buffer.from(message));
     
    } catch (error) {
     
    }
  };
  
  export { publishDirectMessage };