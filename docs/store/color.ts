import { Ref } from "nuxt/dist/app/compat/capi";

export interface ColorGradationsInterface {
  default: string,
  lighten: {
    1: string
    2: string
  }
  darken: {
    1: string
    2: string
  }
}
export interface ColorsInterface {
  white: ColorGradationsInterface
  black: ColorGradationsInterface
  red: ColorGradationsInterface
  blue: ColorGradationsInterface
  yellow: ColorGradationsInterface
  green: ColorGradationsInterface
  theme: {
    text: string
    background: string,
  }
}

export const useColorStore = () => {
  const colorMode = useState<ColorsInterface>('color', () => ({
    white: {
      default: '#FCFCF9',
      lighten:{
        1: '#FFFFF1',
        2: '#FFFFEE',
      },
      darken: {
        1: '#F2F2F2',
        2: '#E9E9E0',
      },
    },
    black: {
      default: '#030300',
      lighten: {
        1: '#676764',
        2: '#CBCAC7',
      },
      darken: {
        1: '#2B2B2B',
        2: '#171717',
      },
    },
    red: {
      default: '#FF5050',
      lighten: {
        1: '#ff8484',
        2: '#ffb9b9',
      },
      darken: {
        1: '#993030',
        2: '#662020',
      },
    },
    blue: {
      default: '#5498ff',
      lighten: {
        1: '#87b7ff',
        2: '#bbd6ff',
      },
      darken: {
        1: '#325b99',
        2: '#223d66',
      },
    },
    yellow: {
      default: '#ffbd5a',
      lighten: {
        1: '#ffd18b',
        2: '#ffe5bd',
      },
      darken: {
        1: '#997136',
        2: '#664c24',
      },
    },
    green: {
      default: '#5ccb96',
      lighten: {
        1: '#8ddab5',
        2: '#beead5',
      },
      darken: {
        1: '#377a5a',
        2: '#25513c',
      },
    },
    theme: {
      text: '#030300',
      background: '#F2F2F2',
    }
  }))
  return {
    color: readonly(colorMode),
    cssColor: cssColor(colorMode),
    setLightTheme: setLightTheme(colorMode),
    setDarkTheme: setDarkTheme(colorMode)
  }
}

const setLightTheme = (color: Ref<ColorsInterface>) => {
  return () => color.value.theme = {
    text: color.value.black.default,
    background: color.value.white.darken[1],
  }
}

const setDarkTheme = (color: Ref<ColorsInterface>) => {
  return () => color.value.theme = {
    text: color.value.white.darken[2],
    background: color.value.black.darken[2],
  }
}

const cssColor = (color: Ref<ColorsInterface>) => (
  payloadFirst: 'white' | 'black' | 'red' | 'blue' | 'yellow' | 'green' | 'theme',
  payloadSecond:  'default' | 'lighten' | 'darken' | 'text' | 'background',
  PayloadThird?:  1 | 2,
) => {
  const returnColor = PayloadThird ? color.value[payloadFirst][payloadSecond][PayloadThird] : color.value[payloadFirst][payloadSecond]
  return returnColor
}