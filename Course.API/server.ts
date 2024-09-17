import app from "./src/app";



app.listen('3001', ()=>{
    console.log("listening to port 3001")
})


process.on("SIGINT", ()=>{
    console.log("Exit Server")
})