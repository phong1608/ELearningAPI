import express,{ Application } from "express";
import compression from 'compression'
import helmet from "helmet"
import { config } from "./config";
import database from "./dbs/mongodb.init";
import cartRouter from "./routes/index"
import { Channel } from "amqplib";
import createConnection from "./queue/rabbitmq.connection";
import { consumeAddToCartMessage } from "./queue/consumer";

let CartChannel:Channel
class CartServer{
    private app:Application
    constructor(app:Application){
        this.app = app;
    }
    public start(){
        this.databaseConnection
        this.startQueue()
        this.standartMiddleware(this.app)
        this.routesMiddelware(this.app)
        this.startServer(this.app)
    }
    private databaseConnection():void
    {
        database.connect()
    }
    private async startQueue()
    {
        CartChannel = await createConnection()
        await consumeAddToCartMessage(CartChannel)
    }
    private standartMiddleware(app:Application){
        app.use(helmet())
        app.use(compression())
        app.use(express.json({limit:'200mb'}))
        app.use(express.urlencoded({limit:'200mb',extended:true}))
    }
    private routesMiddelware(app:Application)
    {
        app.use("",cartRouter)
    }
    private startServer(app:Application)
    {
        app.listen(config.PORT,()=>{
            console.log("Listening on port " + config.PORT)
        })
    }
}
export {CartChannel,CartServer}