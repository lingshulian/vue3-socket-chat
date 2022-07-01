
/**
 * 下划线字符串转成驼峰字符串
 * example: aaa_bbb_ccc -> aaaBbbCcc
 */

 const formatToHump = (str) => {
  if(!str.includes('_')) return str

  return str.split('_').map((item, index) => {
    if (index === 0) return item
    return item.charAt(0).toUpperCase() + item.slice(1)
  }).join('')
}

 module.exports = (data) => {
    const formatTransferKey = (data) => {
      if (data instanceof Array) {
        data.forEach(item => formatTransferKey(item))
      } else if (data instanceof Object) {
        for (const key in data) {
          hump = formatToHump(key)
          data[hump] = data[key]
          if (key !== hump) {
            delete data[key]
          }
          if (data[hump] instanceof Object) {
            formatTransferKey(data[hump])
          }
        }
      } else if (typeof data === 'string') {
        data = formatToHump(data)
      }
    }
    formatTransferKey(data)
    return data
 }
