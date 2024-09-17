import app from './src/app'
import dotenv from "dotenv"
dotenv.config()
const PORT = process.env.PORT


app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})
process.on("SIGINT", ()=>{
    console.log("Exit Server")
})
