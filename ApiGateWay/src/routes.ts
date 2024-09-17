import { Application } from "express";
import { healthRoutes } from "./routes/health";



export const healthRoute = (app:Application)=>{
    app.use("",healthRoutes.routes())
}


