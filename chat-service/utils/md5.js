const crypto = require('crypto')
const {cryptoKey} = require('../config')

const _md5 = (content) => {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}
module.exports = (content) => {
  return _md5(`password=${content};key=${cryptoKey}`)
}