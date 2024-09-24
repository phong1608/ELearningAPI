import { OrderServer } from "./server";
import express from "express"


class Application {
    public initialize(): void {
        const app = express();
        const server = new OrderServer(app)
        server.start()
    }



}
const app = new Application()
app.initialize()