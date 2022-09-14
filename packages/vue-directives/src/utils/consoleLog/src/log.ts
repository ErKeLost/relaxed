const withLog =
  (date: { getHours: () => any; getMinutes: () => any; getSeconds: () => any }) =>
  (type: any) =>
  (data: any) => {
    console.log(
      data,
      `[${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}] [${type}] `
    )
  }

const dateLog = withLog(new Date())
const log = dateLog('RESOURCES')
const debugLog = dateLog('DEBUG')
const featLog = dateLog('FEATURE')
export { log, debugLog, featLog }
