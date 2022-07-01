exports.info = {
  sucess: function (data, message = '') {
    return {
      state: true,
      message,
      data
    }
  },
  error: function (message = '') {
    return {
      state: false,
      message
    }
  }
}