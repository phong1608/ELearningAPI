import express,{ Application } from "express";
import { config } from "./config";
import helmet from "helmet"
import compression from "compression"
import discountRoute from "./routes/index"
import { Channel } from "amqplib";
import createConnection from "./queues/rabbitmq.connection";
let DiscountChannel:Channel
const PORT = config.PORT||3005
class DiscountServer{
    private app:Application
    constructor(app:Application) {
        this.app=app
        
    }

    public start()
    {
        this.startQueue
        this.standardMiddleware(this.app)
        this.routeMiddlwware(this.app)
        this.startServer(this.app)
    }
    public async startQueue()
    {
        DiscountChannel = await createConnection()
    }
    public standardMiddleware(app:Application)
    {
        app.use(express.json())
        app.use(express.urlencoded({extended:true}))
        app.use(helmet())
        app.use(compression())

    }
    public routeMiddlwware(app:Application)
    {
        app.use("",discountRoute)
    }
    public startServer(app:Application)
    {
        app.listen(PORT,()=>{
            console.log("Listening at port ",PORT)
        })
    }
}
export {DiscountServer,DiscountChannel}