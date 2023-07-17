const express = require("express");
const cors = require("cors")
const { connection } = require("./config/db");
const { userRoute } = require("./routes/User.route");
const { quizRoute } = require("./routes/Quiz.route");

const app = express();
app.use(express.json())
app.use(cors())
require("dotenv").config()

app.get("/",(req,res)=>{
    res.send("quiz")
})


app.use("/user",userRoute)
app.use("/quiz",quizRoute)

app.listen(process.env.Port,async()=>{
    try {
        await connection
        console.log("Connected to Mongodb")
    } catch (error) {
        console.log("Not connected to Mongodb")
    }
    console.log(`server is running at port ${process.env.Port}`)
})