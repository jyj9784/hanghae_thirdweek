const express = require("express");
const Boards = require('../schemas/boards');
const router = express.Router();
const moment = require("moment");

const boards = [];
//전체 조회
router.get("/boards", async(req, res) => {
    const boards = await Boards
    .find({}, {num:1,title:1, time:1, name:1})
    .sort({"time":-1});
    res.json({ boards,});
});
//게시물 조건 조회
router.get('/boards',async (req,res)=>{
    const { userId, title, time, content } = req.query 
    const boards = await Boards
    .find({userId, title, time, content}, {num:1,title:1,name:1,content:1,time:1, _id: 0} )
    .sort({time:-1})
    res.json({ boards,});
});
router.get('/boards/:num',async (req,res)=>{
    const { num } = req.params;
    const [detail] = await Boards.find({}, {num:1,title:1, time:1, userId:1, content:1})
    res.json({ detail,}) 
});
//글 작성
router.post("/boards", async(req, res) => {
    const time = moment().add('9','h').format('YYYY-MM-DD HH:mm:ss')//표준시와의 시차적용한 시간
    const { num, userId, title, content, password,} = req.body;

    const boards = await Boards.find({ num });
    if (boards.length) {
      return res.status(400).json({ success: false, errorMessage: "이미 있는 게시글입니다."})
    }

    const createdBoards = await Boards.create({ num, userId, title, content, password, time });

    res.json({ boards : createdBoards});
});

//게시글 수정
router.put("/boards/:num", async (req, res) => {
    const { num } = req.params;
    const {userId, title, content, password} = req.body;

    const existsboards = await Boards.find({ num: Number(num) }); 
    
    if (!existsBoards){
        return res.status(400).json({ success: false, errorMessage: "찾는 게시물 없음."});
    }
    if (Number(password) !== Number(existsLists.password)){
        return res.status(400).json({ success: false, errorMessage: "비밀번호 틀렸음."});
    }
    await Boards.uptimeOne({num: Number(num)}, {$set: {userId, content, title, time}});
    
    res.json({ success: true});
});

//게시글 제거 , 입력된 비밀번호를 비교하여 동일할 때만 글이 삭제되게 하기
router.delete("/boards/:num", async (req, res)=>{

    const { num } = req.params;
    const {userId, title, content, password} = req.body;

    const existsboards = await Boards.find({ num: Number(num) }); 

    if (existsBoards.length) {
        if(Number(password)===Number(existsLists.password)){
            await Boards.deleteOne({ num: Number(num)} ,{$set: {userId, content, title, time}});
        }
        else{
            return res.status(400).json({ success: false, errorMessage: "비밀번호 틀렸음."});
        }
    }

    res.json({ success: true});
});

module.exports = router;
