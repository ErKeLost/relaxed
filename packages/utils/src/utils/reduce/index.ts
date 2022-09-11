// 累加
function Accumulation(...val) {
  return val.reduce((t, v) => t + v, 0)
}

// 累乘
function Multiplication(...val) {
  return val.reduce((t, v) => t * v, 1)
}

// 饭庄
function Reverse(arr = []) {
  return arr.reduceRight((t, v) => (t.push(v), t), [])
}

// 二维数组
function Chunk(arr = [], size = 1) {
  return arr.length
    ? arr.reduce(
        (t, v) => (t[t.length - 1].length === size ? t.push([v]) : t[t.length - 1].push(v), t),
        [[]]
      )
    : []
}

// 两个数组过滤
function Difference(arr = [], arr2 = []) {
  return arr.reduce((t, v) => (!arr2.includes(v) && t.push(v), t), [])
}

// 数组填充
function Fill(arr = [], val = '', start: number = 0, end = arr.length) {
  if (start < 0 || start >= end || end > arr.length) return arr
  return [
    ...arr.slice(0, start),
    ...arr.slice(start, end).reduce((t, v) => (t.push(val || v), t), []),
    ...arr.slice(end, arr.length)
  ]
}

// 扁平化

function Flat(arr = []) {
  return arr.reduce((t, v) => t.concat(Array.isArray(v) ? Flat(v) : v), [])
}

// 去重

function Uniq(arr = []) {
  return arr.reduce((t, v) => (t.includes(v) ? t : [...t, v]), [])
}

// 最大值
function Max(arr = []) {
  return arr.reduce((t, v) => (t > v ? t : v))
}

// 最小值
function Min(arr = []) {
  return arr.reduce((t, v) => (t < v ? t : v))
}

// 成员位置记录
function Position(arr = [], val) {
  return arr.reduce((t, v, i) => (v === val && t.push(i), t), [])
}

// 根据属性分组
function Group(arr = [], key) {
  return key ? arr.reduce((t, v) => (!t[v[key]] && (t[v[key]] = []), t[v[key]].push(v), t), {}) : {}
}

// 关键字查询
function Keyword(arr = [], keys = []) {
  return keys.reduce((t, v) => (arr.some((w) => w.includes(v)) && t.push(v), t), [])
}

// 数字千分化

function ThousandNum(num = 0) {
  const str = (+num).toString().split('.')
  const int = (nums) =>
    nums
      .split('')
      .reverse()
      .reduceRight((t, v, i) => t + (i % 3 ? v : `${v},`), '')
      .replace(/^,|,$/g, '')
  const dec = (nums) =>
    nums
      .split('')
      .reduce((t, v, i) => t + ((i + 1) % 3 ? v : `${v},`), '')
      .replace(/^,|,$/g, '')
  return str.length > 1 ? `${int(str[0])}.${dec(str[1])}` : int(str[0])
}

// url反序列化
function ParseUrlSearch() {
  return location.search
    .replace(/(^\?)|(&$)/g, '')
    .split('&')
    .reduce((t, v) => {
      const [key, val] = v.split('=')
      t[key] = decodeURIComponent(val)
      return t
    }, {})
}

// url参数序列化.
function StringifyUrlSearch(search: any = {}) {
  return Object.entries(search)
    .reduce(
      (t, v) => `${t}${v[0]}=${encodeURIComponent(v[1])}&`,
      Object.keys(search).length ? '?' : ''
    )
    .replace(/&$/, '')
}

export { Multiplication, Accumulation }
