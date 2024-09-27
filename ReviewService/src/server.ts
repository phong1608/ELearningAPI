import express,{ Application } from "express";
import compression from "compression"
import helmet from "helmet"
import { config } from "./config";
import { Channel } from "amqplib";
import reviewRouter from "./routes/index"
const PORT = config.PORT||3005
let ReviewChannel:Channel
class ReviewSever{
    private app:Application
    constructor(app:Application) {
        this.app=app
        
    }

    public start()
    {
        this.standardMiddleware(this.app)
        this.routeMiddlwware(this.app)
        this.startServer(this.app)
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
        app.use("",reviewRouter)
    }
    public startServer(app:Application)
    {
        app.listen(PORT,()=>{
            console.log("Listening at port ",PORT)
        })
    }
}
export {ReviewSever,ReviewChannel}