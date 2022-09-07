// doItem with yourSelf
interface IVDrbounceDirectiveOption {
  /**
   * The `event` of the directive debounce.
   * 事件  in  deboucne
   *
   * @remarks
   * 事件  in  deboucne
   *
   * @default
   * 'null'
   */
  event: string
  /**
   * The `delay` of the directive debounce with call back methods.
   * 事件  in  deboucne
   *
   * @remarks
   * 延迟事件 时间  in  deboucne
   *
   * @default
   * '500'
   */
  delay: number
  /**
   * The `delay` of the directive debounce with call back methods.
   * 事件  in  deboucne
   *
   * @remarks
   * 方法 时间  in  deboucne
   *
   * @default
   * 'null
   */
  callback: any
  /**
   * The `headExecution` of the directive debounce with call back methods.
   * 事件  in  deboucne
   *
   * @remarks
   * 头部执行 或者 尾部执行  in  deboucne
   *
   * @default
   * false  默认 尾部执行
   */
  headExecution: boolean
}

interface IVDrbouncePluginOption extends IVDrbounceDirectiveOption {
  directive: string
}

const DEFAULT_PLUGIN_OPTIONS: IVDrbouncePluginOption = {
  directive: 'debounce',
  event: 'click',
  headExecution: false,
  delay: 1000,
  callback: null
}
// METHOD 方法 不指定 默认值  可以 直接 调用 方法 或者对象
export {
  DEFAULT_PLUGIN_OPTIONS,
  IVDrbouncePluginOption,
  IVDrbounceDirectiveOption
}
