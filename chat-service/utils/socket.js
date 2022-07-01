
const socket = require("socket.io")

const jwt = require('jsonwebtoken')
const { jwtConfig: { secret, algorithms } } = require('../config')

const {
  getUserById,
  getUserByChatId,
  updateChatIdById,
  updateOnlineStatusById,
  updateSessionHistoryById
} = require("../model/socket")

const {
  getContentBySendId,
  getUnReadContent,
  insertContent,
  updateIsReadById
} = require("../model/content")

const dayjs = require('dayjs')

const decodeInfo = (token) => {
  return new Promise((resolve,reject)=>{
    jwt.verify(token, secret, {algorithms}, (err, data)=>{
      if(err || !data.id){
        reject('token 错误')
      }
      resolve(data)
    })
  })
}

module.exports = (server) => {
  const io = socket(server, {
    cors: {
      origin: "*",
    }
  })
    // 事件
  io.on("connection", async function (socket) {
    if(!socket.handshake.auth.token){
      socket.disconnect()
    }
    
    let userInfo = await decodeInfo(socket.handshake.auth.token).catch(()=>{
      socket.disconnect()
    })

    // 加入聊天
    socket.on("joinChat", async () => {
      try {
        // 下线已登录的设备
        const {id: sendId, timestamp} = userInfo
        const userResult = await getUserById(sendId)
        
        // 旧登录下线
        socket.to(userResult.data.chatId).emit("squeezeOut")
        
        // 旧登录
        if(userResult.state && (timestamp < userResult.data.timestamp)){
          socket.emit("forceOut")
          return
        }

        // 更新聊天id
        await updateChatIdById(sendId, socket.id)
        // 更新聊天状态
        await updateOnlineStatusById(sendId, true)
        
        let contents = await getContentBySendId(sendId)
        let conversition = []
        if (contents.state) {
          conversition = contents.data
        }
        let historySessionList = []
        if (userResult.data.sessionHistory != null) {
          historySessionList = JSON.parse(userResult.data.sessionHistory)
        }
        socket.emit("joinSuccess", {
          conversition,
          historySessionList
        })
      } catch (err) {
        console.log(err.message)
      }
    })

    //发送消息
    socket.on("sendMsg", async ({conversition, conversition: {recipientId}}) => {
      try {
        let queryResult = await getUserById(recipientId)
        if (!queryResult.state) {
          console.log("获取数据失败")
          return
        }
        let reciver = queryResult.data
        conversition.status = 1 // 设置发送状态为成功
        conversition.createAt = dayjs().format('YYYY-MM-DD HH:mm:ss')
        await insertContent(conversition) // 在数据库中先插入聊天内容
        if (reciver && reciver.chatId) {
          socket.to(reciver.chatId).emit("reviceMsg", conversition) // 推送
        }
        socket.emit("changMsgstatus", conversition)

        // 将发送者的会话存储到接收者的历史会话中
        if (reciver.sessionHistory != null) {
          let historySessionList = JSON.parse(reciver.sessionHistory)
          let len = historySessionList.filter((x) => x.id == userInfo.id)?.length ?? 0
          if (len === 0) {
            const datas = {
              ...userInfo,
              historySessionList: ''
            }
            historySessionList.push(datas)
            updateSessionHistoryById(JSON.stringify(historySessionList), reciver.id)
          }
        } else {
          let historySessionList = []
          const datas = {
            ...userInfo,
            historySessionList: ''
          }
          historySessionList.push(datas)
          updateSessionHistoryById(JSON.stringify(historySessionList), reciver.id)
        }
      } catch (err) {
        console.log(err.message)
      }
    })

    //修改信息阅读状态
    socket.on("changeMsgRead", async ({sendId}) => {
      try {
        let contentResult = await getUnReadContent(sendId, userInfo.id)
        if (contentResult.state && contentResult.data.length) {
          contentResult.data.map(x => {
            updateIsReadById(x.id)
          })
        }
      } catch (err) {
        console.log(err.message)
      }
    })

    //新增历史会话
    socket.on("insertHistorySession", async ({recipient}) => {
      try {
        const userResult = await getUserById(userInfo.id)
        if (userResult.state && userResult.data && userResult.data.id) {
          let historySessionList = []
          if (userResult.data.sessionHistory != null) {
            historySessionList = JSON.parse(userResult.data.sessionHistory)
            let len = historySessionList.filter((x) => x.id == recipient.id)?.length ?? 0
            if (len == 0) {
              const handleData = {
                ...recipient
              }
              delete handleData.sessionHistory
              historySessionList.push(handleData)
              updateSessionHistoryById(JSON.stringify(historySessionList), userInfo.id)
            }
          } else {
            const handleData = {
              ...recipient
            }
            delete handleData.sessionHistory
            historySessionList.push(handleData)
            updateSessionHistoryById(JSON.stringify(historySessionList), userInfo.id)
          }
        }
      } catch (err) {
        console.log(err.message)
      }
    })

    socket.on("disconnect", async () => {
      let queryResult = await getUserByChatId(socket.id)
      if (queryResult.state && queryResult.data.length) {
        updateOnlineStatusById(queryResult.data[0].id, false)
      }
    })
  })
}