import { useColorStore } from '~~/store/colorStore'

/**
 * 背景色から輝度を求め、テキストのカラーを返す関数
 * @param backgroundColor 背景色（#RRGGBB）
 * @returns テキストカラー（#RRGGBB）
 */
export const dependsLuminanceColor = (backgroundColor: string) => {
  const { color } = useColorStore()

  const backgroundColorCode = backgroundColor
  const red = backgroundColorCode.substring(1, 3)
  const green = backgroundColorCode.substring(3, 5)
  const blue = backgroundColorCode.substring(5, 7)

  let luminance = Math.floor((parseInt(red, 16) * 0.299) + (parseInt(green, 16) * 0.587) + (parseInt(blue, 16) * 0.114))
  luminance = luminance / 255

  const isWhite = luminance < 0.6

  return isWhite ? color.value.white.darken[2] : color.value.black.default
}
