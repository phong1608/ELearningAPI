import express from "express"
import { GateWayServer } from "./server"
class Application{
    public initialize(){
        const app = express()
        const server=new GateWayServer(app)
        server.start()
    }
}

const application:Application=new Application()
application.initialize()