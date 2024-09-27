import express,{ Application } from "express";
import compression from "compression"
import helmet from "helmet"
import AuthRoute from "./routes/index"
import { config } from "./config";
import database from "./dbs/mongodb.init";
const PORT = config.PORT ||4000
class AuthServer{
    private app:Application
    constructor(app:Application)
    {
        this.app = app;
    }
    public start()
    {
        this.standardMiddlware(this.app)
        this.startDatabaseConnection()
        this.routeMiddleware(this.app)
        this.startServer(this.app)
    }
    public startDatabaseConnection()
    {
        database.connect()
    }
    public standardMiddlware(app:Application)
    {
        app.use(express.json())
        app.use(express.urlencoded({extended:true}))
        app.use(compression())
        app.use(helmet())
        
    }
    public routeMiddleware(app:Application)
    {
        app.use("",AuthRoute)
    }

    public startServer(app:Application)
    {
        app.listen(PORT,()=>{
            console.log("Listen on port " +PORT)
        })
    }
    
}
export  {AuthServer}