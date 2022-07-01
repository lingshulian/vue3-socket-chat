const { info } = require('../utils/format')
const dbQuery = require('../db')

const formatToHump = require('../utils/formatToHump')

// 获取用户的聊天内容
exports.getContentBySendId = function (sendId) {
  return new Promise((resolve, reject) => {
    try {
      const sql = `select * from chat where send_id = ? or recipient_id = ?`
      dbQuery(sql, [sendId,sendId], (err, content) => {
        if (err) {
          reject(info.error("查询聊天内容失败"))
        } else {
          resolve(info.sucess(formatToHump(content), "成功"))
        }
      })
    } catch {
      reject(info.error("查询聊天内容异常"))
    }
  })
}

// 插入聊天内容
exports.insertContent = function ({sendId, recipientId, content, type, status, timestamp, createAt, isRead, avatar}) {
  return new Promise((resolve, reject) => {
    try {
      const sql = `insert into chat set ?`
      dbQuery(sql, {send_id: sendId, recipient_id: recipientId, content, type, status, timestamp, create_at: createAt, is_read: isRead, avatar}, (err) => {
        if (err) {
          reject(info.error("插入聊天内容失败"))
        } else {
          resolve(info.sucess(null, "成功"))
        }
      })
    } catch {
      reject(info.error("插入聊天内容异常"))
    }
  })
}

// 获取用户未读信息
exports.getUnReadContent = function (sendId, recipientId) {
  return new Promise((resolve, reject) => {
    try {
      const sql = `select * from chat where send_id = ?  and recipient_id = ? and is_read = false`
      dbQuery(sql, [sendId, recipientId], (err, content) => {
        if (err) {
          reject(info.error("获取用户未读信息失败"))
        } else {
          resolve(info.sucess(formatToHump(content), "成功"))
        }
      })
    } catch {
      reject(info.error("获取用户未读信息异常"))
    }
  })
}

// 更新聊天内容阅读状态
exports.updateIsReadById = function (id) {
  return new Promise((resolve, reject) => {
    try {
      const sql = `update chat set is_read = 1 where id = ?`
      dbQuery( sql, id, (err) => {
        if (err) {
          reject(info.error("更新聊天内容阅读状态失败"))
        } else {
          resolve(info.sucess(null, "成功"))
        }
      })
    } catch {
      reject(info.error("更新聊天内容阅读状态异常"))
    }
  })
}