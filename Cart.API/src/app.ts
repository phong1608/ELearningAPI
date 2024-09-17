import { CartServer } from "./server";
import express from "express";


class Application
{
    public initialize()
    {
        const app = express()
        const server = new CartServer(app)
        server.start()

    }
}
const app = new Application()
app.initialize()