import express from "express"
import router from "./routes"
import instanceMongoDb from "./dbs/mongodb.init"
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
instanceMongoDb
app.use("/api/v1",router)

export default app