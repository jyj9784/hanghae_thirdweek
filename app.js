const express = require("express");
const connect = require("./schemas");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

const boardsRouter = require("./routes/boards");
const usersRouter = require("./routes/users");
const commentRouter = require("./routes/comment");


mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));


app.use(express.json());
app.use("/api",express.urlencoded({ extended: false }), [boardsRouter],[usersRouter], [commentRouter]);


app.get("/", (req, res)=> {
    res.send("Blog Mainpage");
});

app.listen(port, ()=>{
    console.log("포트로 서버 ON!");
});