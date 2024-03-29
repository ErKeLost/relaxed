/* eslint-disable no-param-reassign */
import type {
  ColorPickerColor,
  ColorInt,
  HSV,
  HSVA,
  RGB,
  RGBA,
  HSL,
  HSLA,
  Hex,
  Hexa,
  Color
} from './color-types'
import { chunk, padEnd, has, keepDecimal } from '../common/common'
export function isCssColor(color?: string | false): boolean {
  return Boolean(color) && Boolean((color as any).match(/^(#|var\(--|(rgb|hsl)a?\()/))
}
export function colorToInt(color: Color): ColorInt {
  let rgb
  if (typeof color === 'number') {
    rgb = color
  } else if (typeof color === 'string') {
    let c = color[0] === '#' ? color.substring(1) : color
    if (c.length === 3) {
      c = c
        .split('')
        .map((char) => char + char)
        .join('')
    }
    if (c.length !== 6) {
      // consoleWarn(`'${color}' is not a valid rgb color`)
    }
    rgb = parseInt(c, 16)
  } else {
    throw new TypeError(
      `Colors can only be numbers or strings, received ${
        color === null ? color : color.constructor.name
      } instead`
    )
  }

  if (rgb < 0) {
    // consoleWarn(`Colors cannot be negative: '${color}'`)
    rgb = 0
  } else if (rgb > 0xffffff || isNaN(rgb)) {
    // consoleWarn(`'${color}' is not a valid rgb color`)
    rgb = 0xffffff
  }

  return rgb
}
export function intToHex(color: ColorInt): string {
  let hexColor: string = color.toString(16)

  if (hexColor.length < 6) hexColor = '0'.repeat(6 - hexColor.length) + hexColor

  return `#${hexColor}`
}

export function colorToHex(color: Color): string {
  return intToHex(colorToInt(color))
}

/**
 * Converts HSVA to RGBA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV
 *
 * @param color HSVA color as an array [0-360, 0-1, 0-1, 0-1]
 */
export function HSVAtoRGBA(hsva: HSVA): RGBA {
  const { h, s, v, a } = hsva
  const f = (n: number) => {
    const k = (n + h / 60) % 6
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const rgb = [f(5), f(3), f(1)].map((v) => Math.round(v * 255))

  return {
    r: rgb[0],
    g: rgb[1],
    b: rgb[2],
    a
  }
}

/**
 * Converts RGBA to HSVA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV
 *
 * @param color RGBA color as an array [0-255, 0-255, 0-255, 0-1]
 */
export function RGBAtoHSVA(rgba: RGBA): HSVA {
  if (!rgba)
    return {
      h: 0,
      s: 1,
      v: 1,
      a: 1
    }

  const r = rgba.r / 255
  const g = rgba.g / 255
  const b = rgba.b / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  let h = 0

  if (max !== min) {
    if (max === r) {
      h = 60 * (0 + (g - b) / (max - min))
    } else if (max === g) {
      h = 60 * (2 + (b - r) / (max - min))
    } else if (max === b) {
      h = 60 * (4 + (r - g) / (max - min))
    }
  }

  if (h < 0) h += 360

  const s = max === 0 ? 0 : (max - min) / max
  const hsv = [h, s, max]

  return {
    h: hsv[0],
    s: hsv[1],
    v: hsv[2],
    a: rgba.a
  }
}

export function HSVAtoHSLA(hsva: HSVA): HSLA {
  const { h, s, v, a } = hsva

  const l = v - (v * s) / 2

  const sprite = l === 1 || l === 0 ? 0 : (v - l) / Math.min(l, 1 - l)

  return {
    h,
    s: sprite,
    l,
    a
  }
}

export function HSLAtoHSVA(hsl: HSLA): HSVA {
  const { h, s, l, a } = hsl

  const v = l + s * Math.min(l, 1 - l)

  const sprite = v === 0 ? 0 : 2 - (2 * l) / v

  return {
    h,
    s: sprite,
    v,
    a
  }
}

export function RGBAtoCSS(rgba: RGBA): string {
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
}

export function RGBtoCSS(rgba: RGBA): string {
  return RGBAtoCSS({
    ...rgba,
    a: 1
  })
}

export function RGBAtoHex(rgba: RGBA): Hex {
  const toHex = (v: number) => {
    const h = Math.round(v).toString(16)
    return ('00'.substr(0, 2 - h.length) + h).toUpperCase()
  }

  return `#${[toHex(rgba.r), toHex(rgba.g), toHex(rgba.b), toHex(Math.round(rgba.a * 255))].join(
    ''
  )}`
}

export function RGBtoHex(rgba: RGB): Hex {
  const toHex = (v: number) => {
    const h = Math.round(v).toString(16)
    return ('00'.substr(0, 2 - h.length) + h).toUpperCase()
  }

  return `#${[toHex(rgba.r), toHex(rgba.g), toHex(rgba.b)].join('')}`
}

export function HexToRGBA(hex: Hex): RGBA {
  const rgba = chunk(hex.slice(1), 2).map((c: string) => parseInt(c, 16))

  return {
    r: rgba[0],
    g: rgba[1],
    b: rgba[2],
    a: Math.round((rgba[3] / 255) * 100) / 100
  }
}

export function HexToHSVA(hex: Hex): HSVA {
  const rgb = HexToRGBA(hex)
  return RGBAtoHSVA(rgb)
}

export function HSVAtoHex(hsva: HSVA): Hex {
  return RGBAtoHex(HSVAtoRGBA(hsva))
}

export function parseHex(hex: string): Hex {
  if (hex.startsWith('#')) {
    hex = hex.slice(1)
  }

  hex = hex.replace(/([^0-9a-f])/gi, 'F')

  if (hex.length === 3 || hex.length === 4) {
    hex = hex
      .split('')
      .map((x) => x + x)
      .join('')
  }

  if (hex.length === 6) {
    hex = padEnd(hex, 8, 'F')
  } else {
    hex = padEnd(padEnd(hex, 6), 8, 'F')
  }

  return `#${hex}`.toUpperCase().substr(0, 9)
}

export function RGBtoInt(rgba: RGBA): ColorInt {
  // eslint-disable-next-line no-bitwise
  return (rgba.r << 16) + (rgba.g << 8) + rgba.b
}

export function fromHSVA(hsva: HSVA): ColorPickerColor {
  hsva = { ...hsva }
  const hexa = HSVAtoHex(hsva)
  const hsla = HSVAtoHSLA(hsva)
  const rgba = HSVAtoRGBA(hsva)
  return {
    alpha: hsva.a,
    hex: hexa.substr(0, 7),
    hexa,
    hsla,
    hsva,
    hue: hsva.h,
    rgba
  }
}
export function fromRGBA(rgba: RGBA): ColorPickerColor {
  const hsva = RGBAtoHSVA(rgba)
  const hexa = RGBAtoHex(rgba)
  const hsla = HSVAtoHSLA(hsva)
  const hsv = {
    h: hsva.h,
    s: hsva.s,
    v: hsva.v
  }
  const hsl = {
    h: hsla.h,
    s: hsla.s,
    l: hsla.l
  }
  return {
    alpha: hsva.a,
    hex: hexa.substring(0, 7),
    hexa,
    hsla,
    hsva,
    hsv,
    hsl,
    hue: hsva.h,
    rgba
  }
}
export function fromHexa(hexa: Hexa): ColorPickerColor {
  const hsva = HexToHSVA(hexa)
  const hsla = HSVAtoHSLA(hsva)
  const rgba = HSVAtoRGBA(hsva)
  return {
    alpha: hsva.a,
    hex: hexa.substring(0, 7),
    hexa,
    hsla,
    hsva,
    hue: hsva.h,
    rgba
  }
}
export function fromHSLA(hsla: HSLA): ColorPickerColor {
  const hsva = HSLAtoHSVA(hsla)
  const hexa = HSVAtoHex(hsva)
  const rgba = HSVAtoRGBA(hsva)
  return {
    alpha: hsva.a,
    hex: hexa.substring(0, 7),
    hexa,
    hsla,
    hsva,
    hue: hsva.h,
    rgba
  }
}
export function fromHex(hex: Hex): ColorPickerColor {
  return fromHexa(parseHex(hex))
}

export function parseColor(color: any, oldColor?: ColorPickerColor | null) {
  if (!color)
    return fromRGBA({
      r: 255,
      g: 0,
      b: 0,
      a: 1
    })

  if (typeof color === 'string') {
    if (color.indexOf('#') !== -1) {
      // const hex = color.replace('#', '').trim()
      // return fromHexa(hex)
    } else if (color.indexOf('hsl') !== -1) {
      let alpha = null
      const parts = color
        .replace(/hsla|hsl|\(|\)/gm, '')
        .split(/\s|,/g)
        .filter((val) => val !== '')
        .map((val) => parseFloat(val))
      if (parts.length === 4) {
        alpha = parts[3]
      } else if (parts.length === 3) {
        alpha = 1
      }
      return fromHSLA({
        h: parts[0],
        s: parts[1],
        l: parts[2],
        a: alpha
      })
    } else if (color.indexOf('rgb') !== -1) {
      let alpha = null
      const parts = color
        .replace(/rgba|rgb|\(|\)/gm, '')
        .split(/\s|,/g)
        .filter((val) => val !== '')
        .map((val) => parseFloat(val))

      if (parts.length === 4) {
        alpha = parts[3]
      } else if (parts.length === 3) {
        alpha = 1
      }
      return fromRGBA({
        r: parts[0],
        g: parts[1],
        b: parts[2],
        a: alpha
      })
    } else if (color.indexOf('hsv') !== -1) {
      let alpha = null
      const parts = color
        .replace(/hsva|hsv|\(|\)/gm, '')
        .split(/\s|,/g)
        .filter((val) => val !== '')
        .map((val) => parseFloat(val))

      if (parts.length === 4) {
        alpha = parts[3]
      } else if (parts.length === 3) {
        alpha = 1
      }
      return fromHSVA({
        h: parts[0],
        s: parts[1],
        v: parts[2],
        a: alpha
      })
    }
    if (color === 'transparent') return fromHexa('#00000000')
    const hex = parseHex(color)
    if (oldColor && hex === oldColor.hexa) {
      return oldColor
    }
    return fromHexa(hex)
  }

  if (typeof color === 'object') {
    if (color.hasOwnProperty('alpha')) return color

    const a = color.hasOwnProperty('a') ? parseFloat(color.a) : 1

    if (has(color, ['r', 'g', 'b'])) {
      if (oldColor && color === oldColor.rgba) return oldColor
      return fromRGBA({
        ...color,
        a
      })
    } else if (has(color, ['h', 's', 'l'])) {
      if (oldColor && color === oldColor.hsla) return oldColor
      return fromHSLA({
        ...color,
        a
      })
    } else if (has(color, ['h', 's', 'v'])) {
      if (oldColor && color === oldColor.hsva) return oldColor
      return fromHSVA({
        ...color,
        a
      })
    }
  }

  return fromRGBA({
    r: 255,
    g: 0,
    b: 0,
    a: 1
  })
}

export function stripAlpha(color: any, stripAlpha: boolean) {
  if (stripAlpha) {
    const { a, ...rest } = color

    return rest
  }

  return color
}

export function extractColor(
  color: ColorPickerColor,
  input: any,
  mode: string,
  showAlpha: boolean
): any {
  // 色相
  const hue = keepDecimal(color.hsla.h, 2)
  // 饱和度
  const hslSaturation = keepDecimal(color.hsla.s, 2)
  // 亮度
  const lightness = keepDecimal(color.hsla.l, 2)
  // red
  const red = keepDecimal(color.rgba.r)
  // green
  const green = keepDecimal(color.rgba.g)
  // blue
  const blue = keepDecimal(color.rgba.b)
  // HSV饱和度
  const hsvSaturation = keepDecimal(color.hsva.s, 2)
  // value
  const value = keepDecimal(color.hsva.v, 2)
  if (input == null) return color
  function isShowAlpha(mode: string): string {
    return showAlpha ? mode + 'a' : mode
  }
  if (typeof input === 'string') {
    if (mode === 'hex') {
      return showAlpha ? color.hexa : color.hex
    } else if (mode === 'hsl') {
      return `${isShowAlpha(mode)}(${hue}, ${hslSaturation}, ${lightness}${
        showAlpha ? ', ' + color.alpha : ''
      })`
    } else if (mode === 'rgb') {
      return `${isShowAlpha(mode)}(${red}, ${green}, ${blue}${showAlpha ? ', ' + color.alpha : ''})`
    } else if (mode === 'hsv') {
      return `${isShowAlpha(mode)}(${hue}, ${hsvSaturation}, ${value}${
        showAlpha ? ', ' + color.alpha : ''
      })`
    }
    return input.length === 7 ? color.hex : color.hexa
  }

  if (typeof input === 'object') {
    const shouldStrip = typeof input.a === 'number' && input.a === 0 ? !!input.a : !input.a
    if (has(input, ['r', 'g', 'b'])) return stripAlpha(color.rgba, shouldStrip)
    else if (has(input, ['h', 's', 'l'])) return stripAlpha(color.hsla, shouldStrip)
    else if (has(input, ['h', 's', 'v'])) return stripAlpha(color.hsva, shouldStrip)
  }
}

export function hasAlpha(color: any): boolean {
  if (!color) return false

  if (typeof color === 'string') {
    return color.length > 7
  }

  if (typeof color === 'object') {
    return has(color, ['a']) || has(color, ['alpha'])
  }

  return false
}
export function RGBtoRGBA(rgba: RGBA | string | string[]) {
  if (typeof rgba === 'string') {
    rgba = (/rgba?\((.*?)\)/.exec(rgba) || ['', '0,0,0,1'])[1].split(',')
    return {
      r: Number(rgba[0]) || 0,
      g: Number(rgba[1]) || 0,
      b: Number(rgba[2]) || 0,
      a: Number(rgba[3] ? rgba[3] : 1) // Avoid the case of 0
    }
  } else {
    return rgba
  }
}
export function RGBtoHSV(rgb: RGB) {
  if (!rgb)
    return {
      h: 0,
      s: 1,
      v: 1
    }

  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  let h = 0

  if (max !== min) {
    if (max === r) {
      h = 60 * (0 + (g - b) / (max - min))
    } else if (max === g) {
      h = 60 * (2 + (b - r) / (max - min))
    } else if (max === b) {
      h = 60 * (4 + (r - g) / (max - min))
    }
  }

  if (h < 0) h = h + 360

  const s = max === 0 ? 0 : (max - min) / max
  const hsv = [h, s, max]

  return {
    h: hsv[0],
    s: hsv[1].toFixed(2),
    v: hsv[2].toFixed(2)
  }
}
export function HSVtoHSL(hsv: HSV): HSL {
  const { h, s, v } = hsv

  const l = Number((v - (v * s) / 2).toFixed(2))

  const sprime = l === 1 || l === 0 ? 0 : (v - l) / Math.min(l, 1 - l)

  return {
    h,
    s: Number(sprime.toFixed(2)),
    l
  }
}
