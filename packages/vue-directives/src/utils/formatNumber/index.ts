function formatCount(count) {
  var counter = parseInt(count)
  if (counter > 100000000) {
    return (counter / 100000000).toFixed(1) + '亿'
  } else if (counter > 10000) {
    return (counter / 10000).toFixed(1) + '万'
  } else {
    return counter + ''
  }
}

// 12 -> 12
// 5 -> 05
function padLeftZero(time) {
  time = time + ''
  return ('00' + time).slice(time.length)
}

function formatDuration(duration) {
  duration = duration / 1000
  // 488s / 60 = 8.12
  var minute = Math.floor(duration / 60)
  // 488s % 60
  var second = Math.floor(duration) % 60

  return padLeftZero(minute) + ':' + padLeftZero(second)
}

export { formatDuration, formatCount }
