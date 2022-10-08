/**
 * @packageDocumentation
 * @module date
 */

import { formatDate } from './formatDate';

/**
 * @author zxyue25
 * @desc 将两个时间戳或者Date日期转换为指定格式的日期，并用制定连接符连接；
 * 入参可以是秒级时间戳、毫秒级时间戳或者Date日期；如果入参是秒级时间戳（10位），会乘以1000转换；
 * 格式默认为`${yyyy/MM/dd} - `${yyyy/MM/dd}'；如果想更改格式，可传入第三个参数（日期的格式），第四个参数（连接符的格式）
 * @param startDate - Date | Number
 * @param endDate - Date | Number
 * @param formatStr - String 默认格式'yyyy/MM/dd'
 * @param joinStr - String 默认连接符'-'
 * @returns 返回格式化后的日期区间字符串
 * @example
 * ```
 * formatDateRange(1658320372161, 1658717927699) // 2022/07/20 - 2022/07/25
 * formatDateRange(1658320372, 1658717927) // 2022/07/20 - 2022/07/25
 * formatDateRange(1658320372, 1658717927, '', '~') // 2022/07/20 ~ 2022/07/25
 * formatDateRange(1658320372, 1658717927, 'yyyy/MM/dd HH:mm', '~') // 2022/07/20 20:32 ~ 2022/07/25 10:58
 * ```
 */

export const formatDateRange = (
  startDate: number | Date,
  endDate: number | Date,
  formatStr = 'yyyy/MM/dd',
  joinStr = '-',
) => `${formatDate(startDate, formatStr || 'yyyy/MM/dd')} ${joinStr} ${formatDate(endDate, formatStr || 'yyyy/MM/dd')}`;
