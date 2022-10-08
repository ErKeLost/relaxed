/**
 * @packageDocumentation
 * @module date
 */

import { getTime } from 'date-fns';

/**
 * @author zxyue25
 * @desc 获取当前时间或者某个时间的毫秒级时间戳；
 * 如果入参是秒级时间戳（10位），则乘以1000返回毫秒级（13位）时间戳；主要场景在server返回了秒级时间戳，前端先乘以1000转换成日期展示
 * TODO：这里传入了其他数字怎么处理？直接返回还是补齐13位返回？date-fns是直接返回，建议直接返回
 * @param date - Date | Number
 * @returns 返回格式化后的毫秒级时间戳 - Number
 * @example
 * ```
 * getMilliTimestamp() // 1658320372160
 * getMilliTimestamp(new Date()) // 1658320372160
 * getMilliTimestamp(new Date().getTime()) // 1658320372160
 * getMilliTimestamp(Date.parse(new Date())) // 1658320372000
 * getMilliTimestamp(1658312707) // 1658312707000
 * getMilliTimestamp(1) // 1
 * ```
 */
export const getMilliTimestamp = (date?: number | Date): number => {
  if (!date) {
    return getTime(new Date());
  } else {
    if (date instanceof Date) {
      return getTime(date);
    } else {
      if (date.toString().length === 10) {
        return getTime(date * 1000);
      } else {
        return date;
      }
    }
  }
};
