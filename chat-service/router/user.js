const express = require('express')
const router = express.Router()

// 导入验证数据的中间件
const expressJoi = require('../utils/expressJoi')

// 导入需要的验证规则对象
const { reguserRule } = require('../rules/user')
const { addUser, getUserList, login, getUserInfo } = require('../model/user')

// token获取用户信息
router.get('/userInfo', getUserInfo)

// 获取用户列表
router.get('/userList', getUserList)

// 登录接口
router.post('/login', login)

// 注册接口
router.post('/reguser', expressJoi(reguserRule), addUser)


module.exports = router
