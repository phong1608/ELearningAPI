import express from "express"
import {ReviewSever} from "./server"
import database from "./databases/mongodb.init"

class Application{
    public initialize()
    {
        const app = express()
        const server  = new ReviewSever(app)
        server.start()
        database.connect()

    }
}
const app = new Application()

app.initialize()