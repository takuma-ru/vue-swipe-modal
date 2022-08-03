import { Ref } from "nuxt/dist/app/compat/capi";

type ColorModeType = 'light' | 'dark'

export const useDarkModeStore = () => {
  const colorMode = useState<ColorModeType>('colorMode', () => ('light'))
  return {
    colorMode: readonly(colorMode),
    setSystemColorMode: setSystemColorMode(colorMode),
    setLight: setLight(colorMode),
    setDark: setDark(colorMode)
  }
}

const setSystemColorMode = (colorMode: Ref<ColorModeType>) => {
  if (process.browser) {
    console.log('setSystemColorMode', window.matchMedia('(prefers-color-scheme: dark)').matches)
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return () => colorMode.value = 'dark'
    } else {
      return () => colorMode.value = 'light'
    }
  }
}

const setLight = (colorMode: Ref<ColorModeType>) => {
  if (process.browser) {
    return () => colorMode.value = 'light'
  }
}

const setDark = (colorMode: Ref<ColorModeType>) => {
  if (process.browser) {
    return () => colorMode.value = 'dark'
  }
}