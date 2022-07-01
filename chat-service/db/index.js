
const { dbConfig } = require('../config')

const mysql = require("mysql")

const pool = mysql.createPool(dbConfig)

const query =  function (sql, options, callback){
  if(!callback) callback = options
  pool.getConnection(function(err,conn){
    if(err){
      callback(err,null,null)
    }else{
      const arr = [options,function(err,results,fields){
        //事件驱动回调
        callback(err,results,fields)
      }]
      if(typeof options === "function")
        arr.splice(2,1)
      conn.query(sql, ...arr)
      //释放连接，需要注意的是连接释放需要在此处释放，而不是在查询回调里面释放
      conn.release()
    }
  })
}

module.exports = query