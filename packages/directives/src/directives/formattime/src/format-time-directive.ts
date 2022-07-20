import dayjs from 'dayjs'

const DEFAULT_FORMAT_STRING = 'YYYY-MM-DD HH:mm:ss'
const formatTimeCreated = (el: HTMLElement, binding: any) => {
  binding.formatString = DEFAULT_FORMAT_STRING
  if (binding.value) {
    binding.formatString = binding.value
  }
}
const formatTimeMounted = (el: HTMLElement, binding: any) => {
  const textContent = el.textContent
  // TODO textContent 字符串需要转换
  let timestamp = parseInt(textContent)
  if (textContent.length === 10) {
    // TODO 10位数需要转换成毫秒
    timestamp = timestamp * 1000
  }
  // TODO timestamp 修改textContent
  el.textContent = dayjs(timestamp).format(binding.formatString)
}

export { formatTimeMounted, formatTimeCreated }
