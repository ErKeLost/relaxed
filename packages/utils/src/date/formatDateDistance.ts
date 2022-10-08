/**
 * @packageDocumentation
 * @module date
 */

import { formatDistance } from 'date-fns';

import { getMilliTimestamp } from './getMilliTimestamp';
import { LANGUAGE_DATE_FNS_MAP } from './locale';

/**
 * @author zxyue25
 * @desc 获取指定时间距离当前时间或者指定时间多远；
 * @param date - Date | Number
 * @param baseDate - Date | Number，默认为当前时间
 * @param options - 扩展项，可以配置语言，有两种方式：传入语言类型lang；或者直接传入Locale；
 * @returns 返回描述“指定时间距离当前时间或者指定时间多远”的字符串，有多语言处理
 * @example
 * ```
 * formatDateDistance(1658320372161, 1658717927699, { lang: 'zh-CN' }) // 5 天前
 * formatDateDistance(1658320372161, 1658717927699, { lang: 'zh-CN', addSuffix: 'false' }) // 5 天
 * formatDateDistance(1658320372, 1658717927) // 5 days ago'
 * formatDateDistance(new Date('2022-07-12'), new Date('2022-07-17')) // 5 days ago
 * formatDateDistance(new Date('2022-07-05'), new Date('2022-07-12')) // 7 days ago
 * formatDateDistance(new Date('2022-06-12'), new Date('2022-07-12')) // about 1 month ago
 * formatDateDistance(new Date('2021-07-12'), new Date('2022-07-12')) // about 1 year ago
 * formatDateDistance(1658320372, 1658717927, { locale: ko }) // 5일 전
 * ```
 */

type OptionType = {
  locale?: Locale;
  addSuffix?: boolean;
  lang?: keyof typeof LANGUAGE_DATE_FNS_MAP;
};

export const formatDateDistance = (
  date: Date | number = 0,
  baseDate: Date | number = new Date(),
  options?: OptionType,
): string => {
  const initOptions = {
    addSuffix: options?.addSuffix || true,
    locale: options?.locale || LANGUAGE_DATE_FNS_MAP[options?.lang || 'en'],
    ...options,
  };
  if (
    (typeof date === 'number' && date.toString().length === 10) ||
    (typeof baseDate === 'number' && baseDate.toString().length === 10)
  ) {
    return formatDistance(getMilliTimestamp(date), getMilliTimestamp(baseDate), initOptions);
  }
  return formatDistance(date, baseDate, initOptions);
};
