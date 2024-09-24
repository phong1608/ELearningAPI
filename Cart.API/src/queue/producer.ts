import { Channel } from "amqplib";
import createConnection from "./rabbitmq.connection";


const publishDirectMessage = async (
    channel: Channel,
    exchangeName: string,
    routingKey: string,
    message: string,
  ): Promise<void> => {
    
      if (!channel) {
        channel = await createConnection() as Channel;
      }
      await channel.assertExchange(exchangeName, 'direct');
      channel.publish(exchangeName, routingKey, Buffer.from(message));
   
  };
  
  export { publishDirectMessage };