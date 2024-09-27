import { Channel } from 'amqplib';
import createConnection from './queue/rabbitmq.connection';
import compression from "compression"
import helmet from "helmet"
import express, { Application } from "express"
import {config} from "./config"
import instanceMongoDb from './dbs/mongodb.init'
import courseRoute from "./routes/index"
import { consumeAddUserCourseMessage } from './queue/consumer';
let CourseChannel:Channel
const PORT = config.PORT||"3001"
class CourseServer{
    private app:Application
    constructor(app:Application)
    {
        this.app=app
    }

    public start():void
    {
        this.databaseConnection
        this.startQueue()
        this.standardMiddleware(this.app)
        this.standardMiddleware(this.app)
        this.routesMiddleware(this.app)
        this.startServer(this.app)
    }
    public databaseConnection():void
    {
        instanceMongoDb
    }
    
    public async startQueue()
    {
        CourseChannel=await createConnection()
        await consumeAddUserCourseMessage(CourseChannel)
    }
    public standardMiddleware(app:Application)
    {
        app.use(express.json())
        app.use(express.urlencoded({extended: true}))
        app.use(helmet())
        app.use(compression())

    }

    public routesMiddleware(app:Application)
    {
        app.use("",courseRoute)
    }
    public startServer(app:Application)
    {
        app.listen(PORT,()=>{
            console.log("listening on port " + PORT)
        })
    }

}
export {CourseChannel,CourseServer}