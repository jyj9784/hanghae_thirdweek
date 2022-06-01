const express = require("express");
const connect = require("./schemas");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

const boardsRouter = require("./routes/boards");
const usersRouter = require("./routes/users");
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));



app.use("/api", [boardsRouter]);
app.use("/api", [usersRouter]);


app.get("/", (req, res)=> {
    res.send("Blog Mainpage");
});

// const jwt = require("jsonwebtoken");

// const token = jwt.sign({ myPayloadData: 1234 }, "mysecretkey");
// console.log(token);
// const jwt = require("jsonwebtoken");

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJteVBheWxvYWREYXRhIjoxMjM0LCJpYXQiOjE2NTM2NTM5Mjh9.Mmo-iDFk6jOefF66bLwRzoHcqrTd90p7jDIMlsPLvPo";
// const decodedValue = jwt.decode(token);

app.listen(port, ()=>{
    console.log("포트로 서버 ON!");
});