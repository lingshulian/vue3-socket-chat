const { getUserByEmail } = require('../model/user')
const express = require('express')
const router = express.Router()

// 导入验证数据的中间件
const expressJoi = require('../utils/expressJoi')

// const nodemailer = require('nodemailer')
// 导入需要的验证规则对象
const { emailCodeRule } = require('../rules/user')

const sessionCode = require('../utils/session')

// 发送邮箱验证码
router.post('/sendEmailCode', expressJoi(emailCodeRule), getUserByEmail, function (req, res) {
  const { results } = req
  const timestamp = +new Date()
  // 校验邮箱是否被注册
  if (results && results.length)
    return res.cc('该邮箱已被注册')
  else{
    sessionCode[timestamp] = '123456'
    const timer = setInterval(() => {
      sessionCode[timestamp] && (delete sessionCode[timestamp])
      clearInterval(timer)
    }, 60 * 1000)
  }
  // let transport = nodemailer.createTransport(emailConfig);
  // let verificationCode = getCode(6)
  // // 邮件信息
  // let mailObj = {
  //   from: `来自【${emailConfig.auth.user}】`, // 发送方邮箱及标题
  //   to: email, // 对方邮箱地址
  //   subject: '注册账号', // 
  //   html: `您正在注册账号，验证码是：<font>${verificationCode}</font>（如非本人操作，请忽略该信息）`
  // };
  // transport.sendMail(mailObj);
  // sessionCode[timestamp] = verificationCode;
  res.cc('发送验证码成功',200,{ code: sessionCode[timestamp], timestamp})
})
module.exports = router