/**
 * @packageDocumentation
 * @module date
 */

import { formatDuration } from 'date-fns';

import { LANGUAGE_DATE_FNS_MAP } from './locale';

/**
 * @author zxyue25
 * @desc 将指定秒转为‘H小时M分钟S秒’，H、M、S为0时，默认不展示；如果想更改格式可传入第二个扩展参数options
 * @param second - Number，多少秒
 * @param options - 扩展项，可以配置语言，有两种方式：传入语言类型lang；或者直接传入Locale；
 * @returns 返回描述“H小时M分钟S秒”的字符串，有多语言处理
 * @example
 * ```
 * formatDateDuration(71) // 1minute11seconds
 * formatDateDuration(71, { lang: 'zh-CN' }) // 1分钟11秒
 * formatDateDuration(3604, { lang: 'zh-CN' }) // 1小时4秒
 * formatDateDuration(80221, { lang: 'zh-CN' }) // 22小时17分钟1秒
 * formatDateDuration(80221, { locale: ko }) // 22시간17분1초
 * formatDateDuration(80221, { lang: 'zh-CN', delimiter: ',' }) // 22小时,17分钟,1秒
 * formatDateDuration(80221, { lang: 'zh-CN', format: ['hours', 'minutes'] }) // 22小时17分钟
 * formatDateDuration(80220, { lang: 'zh-CN' }) // 22小时17分钟
 * formatDateDuration(80220, { lang: 'zh-CN', zero: true }) // 22小时17分钟0秒
 * formatDateDuration(880220, { lang: 'zh-CN' }) // 244小时30分钟20秒
 * ```
 */

type OptionType = {
  locale?: Locale;
  zero?: boolean;
  delimiter?: string;
  format?: Array<string>;
  lang?: keyof typeof LANGUAGE_DATE_FNS_MAP;
};

export const formatDateDuration = (second: number, options?: OptionType) => {
  const hours = Math.floor(second / 3600);
  const minutes = Math.floor((second % 3600) / 60);
  const seconds = Math.floor(second % 60);

  return formatDuration(
    {
      hours,
      minutes,
      seconds,
    },
    {
      zero: options?.zero || false,
      locale: options?.locale || LANGUAGE_DATE_FNS_MAP[options?.lang || 'en'],
      ...options,
    },
  ).replace(/ /g, '');
};
