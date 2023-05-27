const express = require("express");
const mongoose = require("mongoose");
const studentRoute = require("./routes/student");
const cors = require("cors");

//initializing express app
const app = express();

//to accept json data 
app.use(express.json());
app.use(cors())

//mongoose.connection
mongoose.connect("mongodb://localhost:27017/student" , {}).then(() => {
    console.log("connected to database");
}).catch((err) => {
    console.log(err);
})

app.use("/api" , studentRoute);

app.listen(5000 , () => {
    console.log("server strated")
})
