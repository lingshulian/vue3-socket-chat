const userRouter = require('./user')
const emailRouter = require('./email')
const fileRouter = require('./file')

module.exports = [userRouter, emailRouter, fileRouter]