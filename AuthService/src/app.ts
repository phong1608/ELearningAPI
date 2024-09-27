import { AuthServer } from "./server";
import express from "express"
class Application{
    
    public initialize()
    {
        const app = express()
        const server = new AuthServer(app)
        server.start()
    }
}
const app = new Application()
app.initialize()