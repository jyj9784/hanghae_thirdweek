const express = require("express");
const Users = require("../schemas/users")
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/auth-middleware.js");
const Joi = require("joi")
const router = express.Router();


const postUsersSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(4).required(),
  confirmPassword: Joi.string().required(),
});
//회원가입
router.post("/signup", async (req, res) => {
  try {
    const {
      username,
      password,
      confirmPassword,
    } = await postUsersSchema.validateAsync(req.body);

    if (password !== confirmPassword) {
      res.status(400).send({
        errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
      });
      return;
    }
    else if (password.includes(username)) {
      res.status(400).send({
        errorMessage: "패스워드에 아이디가 포함되어있습니다.",
      });
      return;
    }

    const existUsers = await Users.find({ username });
    if (existUsers.length) {
      res.status(400).send({
        errorMessage: "중복된 닉네임입니다.",
      });
      return;
    }

    const user = new Users({ username, password });
    await user.save();

    res.status(201).send({});
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
    });
  }
});

//로그인
const postAuthSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = await postAuthSchema.validateAsync(req.body);

    const user = await Users.findOne({ username, password }).exec();

    if (!user) {
      res.status(400).send({
        errorMessage: "이메일 또는 패스워드가 잘못됐습니다.",
      });
      return;
    }

    const token = jwt.sign({ username }, "my-secret-key");
    console.log(`${username}님이 로그인 하셨습니다.`)
    res.send({
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
    });
  }
});

router.get('/users/me', authMiddleware, async (req, res) => {
  const user = res.locals.user; // user변수에 locals에있는 객체안에있는 키가 구조분해할당이 되어 들어간다 
  // 여기에 사용자 정보가 들어있다  인증용도
  if (user) {
    res.status(400).send({
      errorMessage: "이미 로그인 되어있습니다."
    });
    return;
  }

});


module.exports = router;
