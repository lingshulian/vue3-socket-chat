// 1. 导入定义验证规则的模块
const joi = require('joi')

const email = joi.string().min(4).required().error(new Error('至少为4个字符'))
const code = joi.string().required().error(new Error('验证码不能为空'))
const password = joi.string().min(6).required().error(new Error('密码至少为6位'))
const timestamp = joi.number().min(10).required().error(new Error('时间戳必须为10为有效数字'))
// 验证规则对象 - 删除分类
exports.reguserRule = {
  body: {
    email,
    code,
    password,
    timestamp
  }
}

exports.emailCodeRule = {
  body: {
    email
  }
}