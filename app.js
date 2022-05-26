const express = require("express");
const connect = require("./schemas");
const req = require("express/lib/request")
const app = express();
const port = 3000;

const router = express.Router();
const boardsRouter = require("./routes/boards");
connect();

app.use(express.json());
app.use("/api", express.json(), [router, boardsRouter]);

app.get("/", (req, res)=> {
    res.send("Blog Mainpage");
});

app.listen(port, ()=>{
    console.log("포트로 서버 ON!");
});