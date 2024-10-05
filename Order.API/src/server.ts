import compression from 'compression';
import helmet  from 'helmet';
import express,{Application,Request,Response,NextFunction} from 'express'
import { config } from './config';
import orderRouter from '../src/routes/index'
import database from './dbs/mongodb.init';
import { Channel } from 'amqplib';
import createConnection from './queues/rabbitmq.connection';
import { consumeCheckoutMessage } from './queues/consumer';
import { IErrorResponse,CustomError } from './helpers/error-reponse';



let orderChannel:Channel
export class OrderServer{
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
        database.connect()
    }
    
    public async startQueue()
    {
        orderChannel=await createConnection()
        await consumeCheckoutMessage(orderChannel)
        

    }
    public standardMiddleware(app:Application)
    {
        app.use(express.json())
        app.use(express.urlencoded({extended: true}))
        app.use(helmet())
        app.use(compression())

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
    public routesMiddleware(app:Application)
    {
        app.use("",orderRouter)
    }
    public startServer(app:Application)
    {
        app.listen(config.PORT,()=>{
            console.log("listening on port " + config.PORT)
        })
    }
}
export {orderChannel}