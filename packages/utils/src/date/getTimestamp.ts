/**
 * @packageDocumentation
 * @module date
 */

import { getUnixTime } from 'date-fns';

/**
 * @author zxyue25
 * @desc 获取当前时间或者某个时间的秒级时间戳；
 * 如果入参是毫秒秒级时间戳（13位），则去除最后三位1000返回毫秒级（13位）时间戳；主要场景在前端需要入参拿秒级时间戳给server
 * @param date - Date | Number
 * @returns 返回格式化后的秒级时间戳 - Number
 * @example
 * ```
 * getTimestamp() // 1658320260
 * getTimestamp(new Date()) // 1658320260
 * getTimestamp(new Date().getTime()) // 1658320260
 * getTimestamp(Date.parse(new Date())) // 1658320260
 * getTimestamp(1658312707) // 1658312
 * getTimestamp(1) // 0
 * ```
 */

export const getTimestamp = (date: number | Date = new Date()): number => getUnixTime(date);
