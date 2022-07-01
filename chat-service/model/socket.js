const { info } = require('../utils/format')
const dbQuery = require('../db')
const formatToHump = require('../utils/formatToHump')

// 通过用户id获取用户信息
exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `select * from user where id =?`
      dbQuery(sql, id, (err, results) => {
        if (err) reject(info.error("查询用户失败"))
        if (!results.length) reject(info.error("查询用户失败"))
        resolve(info.sucess(formatToHump(results[0]), "获取用户成功"))
      })
    } catch {
      reject(info.error("查询用户异常"))
    }
  })
}

// 根据用户id更新用户的socketId
exports.updateChatIdById = function (id, socketId) {
  return new Promise((resolve, reject) => {
    try {
      const sql = `update user set chat_id = ? where id = ?`
      dbQuery(sql, [socketId, id], (err) => {
        if (err) {
          reject(info.error("更新用户socketId失败"))
        } else {
          resolve(info.sucess(null, "成功"))
        }
      })
    } catch {
      reject(info.error("更新用户socketId异常"))
    }
  })
}

// 根据用户id更新用户的在线状态
exports.updateOnlineStatusById = function (id, onlineStatus) {
  return new Promise((resolve, reject) => {
    try {
      const sql = `update user set online_status = ? where id = ?`
      dbQuery(sql, [onlineStatus, id], (err) => {
        if (err) {
          reject(info.error("更新在线状态失败"))
        } else {
          resolve(info.sucess(null, "成功"))
        }
      })
    } catch {
      reject(info.error("更新在线状态异常"))
    }
  })
}

// 根据用户id更新用户的历史会话列表
exports.updateSessionHistoryById = function (sessionHistory, id) {
  return new Promise((resolve, reject) => {
    try {
      const sql = `update user set session_history = ? where id = ?`
      dbQuery(sql, [sessionHistory, id], (err) => {
        if (err) {
          reject(info.error("更新历史会话列表失败"))
        } else {
          resolve(info.sucess(null, "成功"))
        }
      })
    } catch {
      reject(info.error("更新历史会话列表异常"))
    }
  })
}

// 根据socketId获取用户信息
exports.getUserByChatId = function (socketId) {
  return new Promise((resolve, reject) => {
    try {
      const sql = `select * from user where chat_id = ?`
      dbQuery(sql, socketId, (err, user) => {
        if (err) {
          reject(info.error("根据socketId获取用户信息失败"))
        } else {
          resolve(info.sucess(formatToHump(user), "成功"))
        }
      })
    } catch {
      reject(info.error("根据socketId获取用户信息异常"))
    }
  })
}

// 根据用户id更新用户的时间戳
exports.updateTimestampById = function (id, timestamp) {
  return new Promise((resolve, reject) => {
    try {
      let sql = `update user set timestamp = ? where id = ?`;
      dbQuery(sql, [timestamp, id], (err) => {
        if (err) {
          reject(info.error("更新用户时间戳失败"))
        } else {
          resolve(info.sucess(null, "成功"))
        }
      })
    } catch {
      reject(info.error("更新用户时间戳异常"))
    }
  })
}