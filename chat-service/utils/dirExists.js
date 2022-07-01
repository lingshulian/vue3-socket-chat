const path = require("path")
const fs = require("fs")

/**
   * 读取路径信息
   * @param {string} filepath 路径
   */
function getStat(filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        resolve(false)
      } else {
        resolve(stats)
      }
    })
  })
}

/**
   * 创建路径
   * @param {string} dir 路径
   */
 function mkdir(dir) {
  return new Promise((resolve, reject) => {
    try {
      fs.mkdir(dir, { recursive: true }, err => {
        if (err) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    } catch (error) {
      console.log("error", error)
    }
  })
}

/**
   * 路径是否存在，不存在则创建
   * @param {string} dir 路径
   */
module.exports = async function (dir) {
  let isExists = await getStat(dir)
  // 如果该路径存在且不是文件，返回 true
  if (isExists && isExists.isDirectory()) {
    return true
  } else if (isExists) {  // 这个路径对应一个文件夹，无法再创建文件了
    return false
  }
  // 如果该路径不存在
  let tempDir = path.parse(dir).dir  //拿到上级路径
  // 递归判断，如果上级路径也不存在，则继续循环执行，直到存在
  let status = await dirExists(tempDir)
  let mkdirStatus
  if (status) {
    mkdirStatus = await mkdir(dir)
  }
  return mkdirStatus
}