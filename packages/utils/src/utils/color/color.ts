// Utilities
import { consoleWarn } from '../common/console'
import * as sRGB from '@/util/color/transformSRGB'
import * as CIELAB from '@/util/color/transformCIELAB'

// Types
import type { Colors } from '@/composables/theme'
export function padEnd(str: string, length: number, char = '0') {
  return str + char.repeat(Math.max(0, length - str.length))
}
export function chunk(str: string, size = 1) {
  const chunked: string[] = []
  let index = 0
  while (index < str.length) {
    chunked.push(str.substr(index, size))
    index += size
  }
  return chunked
}
export type XYZ = [number, number, number]
export type LAB = [number, number, number]
export type HSV = { h: number; s: number; v: number; a?: number }
export type RGB = { r: number; g: number; b: number; a?: number }
export type HSL = { h: number; s: number; l: number; a?: number }
export type Hex = string & { __hexBrand: never }
export type Color = string | number | {}

export function isCssColor(color?: string | null | false): boolean {
  return !!color && /^(#|var\(--|(rgb|hsl)a?\()/.test(color)
}

export function parseColor(color: Color): RGB {
  if (typeof color === 'number') {
    if (isNaN(color) || color < 0 || color > 0xffffff) {
      // int can't have opacity
      consoleWarn(`'${color}' is not a valid hex color`)
    }

    return {
      r: (color & 0xff0000) >> 16,
      g: (color & 0xff00) >> 8,
      b: color & 0xff
    }
  } else if (typeof color === 'string') {
    let hex = color.startsWith('#') ? color.slice(1) : color

    if ([3, 4].includes(hex.length)) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('')
    } else if (![6, 8].includes(hex.length)) {
      consoleWarn(`'${color}' is not a valid hex(a) color`)
    }

    const int = parseInt(hex, 16)
    if (isNaN(int) || int < 0 || int > 0xffffffff) {
      consoleWarn(`'${color}' is not a valid hex(a) color`)
    }

    return HexToRGB(hex as Hex)
  } else {
    throw new TypeError(
      `Colors can only be numbers or strings, recieved ${
        color == null ? color : color.constructor.name
      } instead`
    )
  }
}

export function RGBToInt(color: RGB) {
  return (color.r << 16) + (color.g << 8) + color.b
}

export function classToHex(
  color: string,
  colors: Record<string, Record<string, string>>,
  currentTheme: Partial<Colors>
): string {
  const [colorName, colorModifier] = color.toString().trim().replace('-', '').split(' ', 2) as (
    | string
    | undefined
  )[]

  let hexColor = ''
  if (colorName && colorName in colors) {
    if (colorModifier && colorModifier in colors[colorName]) {
      hexColor = colors[colorName][colorModifier]
    } else if ('base' in colors[colorName]) {
      hexColor = colors[colorName].base
    }
  } else if (colorName && colorName in currentTheme) {
    hexColor = currentTheme[colorName] as string
  }

  return hexColor
}

/** Converts HSVA to RGBA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV */
export function HSVtoRGB(hsva: HSV): RGB {
  const { h, s, v, a } = hsva
  const f = (n: number) => {
    const k = (n + h / 60) % 6
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)
  }

  const rgb = [f(5), f(3), f(1)].map((v) => Math.round(v * 255))

  return { r: rgb[0], g: rgb[1], b: rgb[2], a }
}

/** Converts RGBA to HSVA. Based on formula from https://en.wikipedia.org/wiki/HSL_and_HSV */
export function RGBtoHSV(rgba: RGB): HSV {
  if (!rgba) return { h: 0, s: 1, v: 1, a: 1 }

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

  if (h < 0) h = h + 360

  const s = max === 0 ? 0 : (max - min) / max
  const hsv = [h, s, max]

  return { h: hsv[0], s: hsv[1], v: hsv[2], a: rgba.a }
}

export function HSVtoHSL(hsva: HSV): HSL {
  const { h, s, v, a } = hsva

  const l = v - (v * s) / 2

  const sprime = l === 1 || l === 0 ? 0 : (v - l) / Math.min(l, 1 - l)

  return { h, s: sprime, l, a }
}

export function HSLtoHSV(hsl: HSL): HSV {
  const { h, s, l, a } = hsl

  const v = l + s * Math.min(l, 1 - l)

  const sprime = v === 0 ? 0 : 2 - (2 * l) / v

  return { h, s: sprime, v, a }
}

export function RGBtoCSS({ r, g, b, a }: RGB): string {
  return a === undefined ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`
}

export function HSVtoCSS(hsva: HSV): string {
  return RGBtoCSS(HSVtoRGB(hsva))
}

function toHex(v: number) {
  const h = Math.round(v).toString(16)
  return ('00'.substr(0, 2 - h.length) + h).toUpperCase()
}

export function RGBtoHex({ r, g, b, a }: RGB): Hex {
  return `#${[
    toHex(r),
    toHex(g),
    toHex(b),
    a !== undefined ? toHex(Math.round(a * 255)) : 'FF'
  ].join('')}` as Hex
}

export function HexToRGB(hex: Hex): RGB {
  let [r, g, b, a] = chunk(hex, 2).map((c: string) => parseInt(c, 16))
  a = a === undefined ? a : Math.round((a / 255) * 100) / 100

  return { r, g, b, a }
}

export function HexToHSV(hex: Hex): HSV {
  const rgb = HexToRGB(hex)
  return RGBtoHSV(rgb)
}

export function HSVtoHex(hsva: HSV): Hex {
  return RGBtoHex(HSVtoRGB(hsva))
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

  return hex as Hex
}

export function parseGradient(
  gradient: string,
  colors: Record<string, Record<string, string>>,
  currentTheme: Partial<Colors>
) {
  return gradient
    .replace(/([a-z]+(\s[a-z]+-[1-5])?)(?=$|,)/gi, (x) => {
      return classToHex(x, colors, currentTheme) || x
    })
    .replace(/(rgba\()#[0-9a-f]+(?=,)/gi, (x) => {
      return (
        'rgba(' +
        Object.values(HexToRGB(parseHex(x.replace(/rgba\(/, ''))))
          .slice(0, 3)
          .join(',')
      )
    })
}

export function lighten(value: RGB, amount: number): RGB {
  const lab = CIELAB.fromXYZ(sRGB.toXYZ(value))
  lab[0] = lab[0] + amount * 10

  return sRGB.fromXYZ(CIELAB.toXYZ(lab))
}

export function darken(value: RGB, amount: number): RGB {
  const lab = CIELAB.fromXYZ(sRGB.toXYZ(value))
  lab[0] = lab[0] - amount * 10

  return sRGB.fromXYZ(CIELAB.toXYZ(lab))
}

/**
 * Calculate the relative luminance of a given color
 * @see https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
export function getLuma(color: Color) {
  const rgb = parseColor(color)

  return sRGB.toXYZ(rgb)[1]
}

/**
 * Returns the contrast ratio (1-21) between two colors.
 * @see https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */
export function getContrast(first: Color, second: Color) {
  const l1 = getLuma(first)
  const l2 = getLuma(second)

  const light = Math.max(l1, l2)
  const dark = Math.min(l1, l2)

  return (light + 0.05) / (dark + 0.05)
}
