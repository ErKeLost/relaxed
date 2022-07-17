// 打包所有模块

const fs = require('fs')
const execa = require('execa') // 开启子进程 最后还是进行rollup
const targets = fs.readdirSync('packages').filter((f) => {
  if (!fs.statSync(`packages/${f}`).isDirectory()) {
    return false
  }
  return true
})

// 对目标进行 依次 并行打包
// done 并行
async function buildFn(target) {
  // 采用 rollup打包  -c命令 --environment TARGET: color
  await execa('rollup', ['-c', '--environment', `TARGET:${target}`], {
    stdio: 'inherit'
  })
  // 当子进程打包的信息 共享给 父进程
}

function runParallel(targets, iteratorFn) {
  const res = []
  for (const item of targets) {
    res.push(iteratorFn(item))
  }
  return Promise.all(res)
}
runParallel(targets, buildFn).then((res) => {
  console.log('all done', res)
})
