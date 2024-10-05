import { DiscountServer } from "./server";

import { databaseConnection } from "./db/db.connection";
import express from "express";


class Application {
    public initialize()
    {
        const app = express()

        const server = new DiscountServer(app)
        databaseConnection()
        server.start()
    }
}
const app = new Application()
app.initialize()