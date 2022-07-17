import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DEFAULT_DATE = 'YYYY-MM-DD HH:mm:ss'

export function formatUtc(utcString: string, format: string = DEFAULT_DATE) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
