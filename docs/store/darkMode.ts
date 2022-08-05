import { Ref } from "nuxt/dist/app/compat/capi";

type ColorModeType = 'light' | 'dark'
/* const w = window */

export const useDarkModeStore = () => {
  const colorMode = useState<ColorModeType>('colorMode', () => ('dark'))
  return {
    colorMode: readonly(colorMode),
    setLight: setLight(colorMode),
    setDark: setDark(colorMode),
    switchMode: switchMode(colorMode),
    /* setSytem: setSytem(colorMode), */
  }
}

const setLight = (colorMode: Ref<ColorModeType>) => {
  return () => colorMode.value = 'light'
}

const setDark = (colorMode: Ref<ColorModeType>) => {
  return () => colorMode.value = 'dark'
}

const switchMode = (colorMode: Ref<ColorModeType>) => {
  return () => colorMode.value = colorMode.value === 'dark' ?  'light' : 'dark'
}

/* const setSytem = (colorMode: Ref<ColorModeType>) => {
  const windowColorMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (windowColorMode) {
    return () => colorMode.value = 'dark'
  } else {
    return () => colorMode.value = 'light'
  }
} */