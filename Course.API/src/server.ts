import { Channel } from 'amqplib';
import createConnection from './queue/rabbitmq.connection';
import compression from "compression"
import helmet from "helmet"
import {config} from "./config"
import courseRoute from "./routes/index"
import { consumeAddUserCourseMessage, consumeAddUserRatingMessage } from './queue/consumer';
import express,{ Application,Request,Response,NextFunction } from "express";
import { IErrorResponse,CustomError } from "./helpers/error-reponse";

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
        this.startQueue()
        this.standardMiddleware(this.app)
        this.standardMiddleware(this.app)
        this.routesMiddleware(this.app)
        this.errorHandler(this.app)
        this.startServer(this.app)
    }
   
    
    public async startQueue()
    {
        CourseChannel=await createConnection()
        await consumeAddUserCourseMessage(CourseChannel)
        await consumeAddUserRatingMessage(CourseChannel)
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
    public errorHandler(app: Application): void {
        
        app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
          if (error instanceof CustomError) {
            console.log('error')
            res.status(error.statusCode).json(error.serializeErrors());
          }
          next();
        });
      }
    public startServer(app:Application)
    {
        app.listen(PORT,()=>{
            console.log("listening on port " + PORT)
        })
    }

}
export {CourseChannel,CourseServer}