import { Ref } from "nuxt/dist/app/compat/capi";

type ColorModeType = 'light' | 'dark'

export const useDarkModeStore = () => {
  const colorMode = useState<ColorModeType>('colorMode', () => ('light'))
  return {
    colorMode: readonly(colorMode),
    setLight: setLight(colorMode),
    setDark: setDark(colorMode)
  }
}

const setLight = (colorMode: Ref<ColorModeType>) => {
  return () => colorMode.value = 'light'
}

const setDark = (colorMode: Ref<ColorModeType>) => {
  return () => colorMode.value = 'dark'
}