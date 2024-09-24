import { CourseServer } from "./server";

import express from "express";

class Application
{
    public initalize()
    {
        const app = express()
        const server = new CourseServer(app)
        server.start()
    }
}

const app = new Application()
app.initalize()