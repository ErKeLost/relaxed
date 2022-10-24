// const handlerLoginLogic = (loginSuccess: boolean, initialPassword?: boolean | null) => {
//   let action = [...loginLogic()].filter(
//     ([key, value]) => key.loginSuccess === loginSuccess && key.initialPassword === initialPassword
//   )
//   action.forEach(([key, value]) => {
//     value.call(this)
//   })
// }
export function useStrategy(args, loginLogic) {
  const action = [...loginLogic()].filter(([key, value]) => {
    return [...args].map((item) => key.item === item)
  })
  action.forEach(([key, value]) => {
    value.call(this)
  })
}
// function loginLogic() {

//   const loginMap = new Map([
//     [
//       {
//         loginSuccess: true,
//         initialPassword: true
//       },
//       () => {
//         console.log('现在是登录成功 并且密码是初始化')
//       }
//     ],
//     [
//       {
//         loginSuccess: true,
//         initialPassword: false
//       },
//       async () => {
//         console.log('现在是登录成功 进入公司首页')
//       }
//     ],
//     [
//       {
//         loginSuccess: false,
//         initialPassword: false
//       },
//       () => {
//         console.log('现在登录失败 出现error')
//       }
//     ]
//   ])
//   return loginMap
// }
