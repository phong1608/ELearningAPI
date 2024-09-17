import express, { Application,Request,Response,NextFunction } from "express"
import cookieSession from "cookie-session"
import hpp from "hpp"
import helmet from "helmet"
import cors from "cors"
import compression from "compression"
import StatusCode from "http-status-codes"
import http from "http"
import dotenv from "dotenv"
import { healthRoute } from "./routes"
dotenv.config()
const PORT = process.env.PORT 
const SERVER_PORT = PORT||4000
export class GateWayServer{
    private app:Application;
    constructor(app:Application)
    {
        this.app = app
    }

    public start(): void{
        this.securityMiddleware(this.app)
        this.standardMiddleware(this.app)
        this.routesMiddleware(this.app)
        this.errorHandler(this.app)
        this.startServer(this.app)
    }
    private securityMiddleware(app:Application): void{
        app.set('trus proxy',1)
        // app.use(
        //     cookieSession({
        //         name:'session',
        //         keys:[],
        //         maxAge:24*7*3600000,
        //         secure:false
        //     })
        // )
        app.use(hpp())
        app.use(helmet())
        app.use(cors({
            origin:"",
            credentials:true,
            methods:["GET", "POST", "PUT", "DELETE"]
        }))
    }
    private standardMiddleware(app:Application): void{
        app.use(compression())
        app.use(express.json({limit:'200mb'}))
        app.use(express.urlencoded({limit:'200mb',extended:true}))
    }
    private routesMiddleware(app:Application): void{
        healthRoute(app)
    }
    private errorHandler(app:Application):void{
        app.use('*',(req:Request,res:Response,next:NextFunction)=>{
            res.status(StatusCode.NOT_FOUND).json({message:"The endpoint called does not exist"})
            next()
        })
         

        
    }
    private async startServer(app:Application):Promise<void>{
        try{
            app.listen(SERVER_PORT,()=>{
                console.log('Gateway server running on port',SERVER_PORT)
            })
        }
        catch(error){
             
        }
    }
    
}