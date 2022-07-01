const express = require("express")

const middleware = require('./middleware')

const router = require('./router')

const app = express()
// 中间件
app.use(middleware)

// 路由
app.use('/api', router)

// 身份认证失败中间件
const errAuth = require('./middleware/errAuth')
app.use(errAuth)

// 启动服务
const server = app.listen(5323, function () {
  console.log(`App running at local http://localhost:5323`)
})

// 聊天socket
const socket = require('./utils/socket')
socket(server)