import { CourseServer } from "./server";
import { databaseConnection } from "./dbs/postgres.init";
import express from "express";

class Application
{
    public initalize()
    {
        const app = express()
        const server = new CourseServer(app)
        databaseConnection()
        server.start()
    }
}

const app = new Application()
app.initalize()