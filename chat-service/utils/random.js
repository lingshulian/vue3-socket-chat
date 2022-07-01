const hexList = []
for (let i = 0; i <= 15; i++) {
    hexList[i] = i.toString(16)
}

/**
 *
 * @returns uuid
 */
 exports.uuid = function() {
  let uuid = ''
  for (let i = 1; i <= 7; i++) {
      if (i === 2 || i === 4) {
          uuid += hexList[(Math.random() * 4) | 8]
      } else {
          uuid += hexList[(Math.random() * 16) | 0]
      }
  }
  return uuid + (+new Date())
}