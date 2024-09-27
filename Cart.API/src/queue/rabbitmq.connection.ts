import amqplib, { Channel, Connection }  from 'amqplib';
import { config } from "../config";

const connection_string = config.RABBITMQ_URL||"amqp://localhost:5672"


const createConnection = async()=>{
    const connection = await amqplib.connect(connection_string)
    const channel: Channel = await connection.createChannel()
    closeConnection(channel,connection)
    return channel
}



const closeConnection = (channel:Channel,connection:Connection)=>{
    process.once("SIGINT",async()=>{
        await channel.close()
        await connection.close()
    })
}
export default createConnection