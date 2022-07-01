const { newUserConfig: {avatar}, expiresIn, jwtConfig: { secret, algorithms } } = require('../config')
const dbQuery = require('../db')
const { uuid } = require('../utils/random')
const md5 = require('../utils/md5')
const jwt = require('jsonwebtoken')
const formatToHump = require('../utils/formatToHump')
const sessionCode = require('../utils/session')
const {
  updateTimestampById
} = require("../model/socket")

// 获取用户列表
exports.getUserList = (req, res) => {
  const sql = `select * from user where id !=?`
  dbQuery(sql, req.auth.id, (err, results) => {
    if (err)return res.cc(err)
      res.cc('获取用户成功', 200, formatToHump(results))
  })
}

// 根据email获取用户信息
exports.getUserByEmail = function (req, res, next) {
  const sql = `select * from user where email = ?`
  dbQuery(sql, req.body.email, (err, results) => {
    if (err) return res.cc(err)
    if (results.length)
      req.results = results
    next()
  })
}

// 新增用户
exports.addUser = function (req, res) {
  const {email, password, code, timestamp} = req.body
  console.log(req.body)
  console.log(sessionCode)
  if(!sessionCode[timestamp] || sessionCode[timestamp] !== code)
    return res.cc('验证码错误，请重试~！')
  delete sessionCode[timestamp]
  const existence = 'select * from user where email=?'
  dbQuery(existence, [email], (err, results)=>{
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    if (results.length) {
      return res.cc('昵称或邮箱被占用，请更换！')
    }
    const sql = `insert into user set ?`
    const _uuids = uuid()

    dbQuery(sql, {name: _uuids, nick_name: _uuids, email, password: md5(password), avatar: avatar[Math.floor(Math.random()*(4))]}, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！')
        res.cc('注册成功！', 200)
    })
  })
}

// 登录
exports.login = (req, res) => {
  const { email, password } = req.body
  const sql = `select * from user where email=?`
  dbQuery(sql, email, async (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('账号或密码错误！')
    const compareResult = results[0].password === md5(password)
    if (!compareResult) return res.cc('账号或密码错误！')
    const timestamp = +new Date
    const user = { ...results[0], timestamp}
    delete user.password
    await updateTimestampById(user.id, timestamp)
    // 对用户的信息进行加密，生成 Token 字符串
    const tokenStr = jwt.sign(user, secret, { expiresIn, algorithm: algorithms[0]  })
    res.cc('登录成功！', 200, { token: tokenStr})
  })
}

// 获取用户基本信息的处理函数
exports.getUserInfo = (req, res) => {
  const sql = `select id, name, nick_name, email, mobile, online_status, avatar, session_history, chat_id, timestamp from user where id=?`
  dbQuery(sql, req.auth.id, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('获取用户信息失败！')
    res.cc('获取用户信息成功！',200, formatToHump(results[0]))
  })
}