import { tryOnMounted } from "@vueuse/core"
import { ref, Ref } from "vue-demi"

/**
 * px, vh, vw をピクセルサイズに変換し、数値として返す
 * @param payload px, vh, vw
 * @returns px(number)
 */
export const toPixel = (size: string, element?: Ref<Element | undefined>) => {
  const pxVal = size.indexOf('px')
  const vhVal = size.indexOf('vh')
  const vwVal = size.indexOf('vw')
  const vminVal = size.indexOf('vmin')
  const vmaxVal = size.indexOf('vmax')
  const percentVal = size.indexOf('%')

  if (pxVal > 0) {
    const px = Number(size.slice(0, pxVal))
    return px
  } else if (vhVal > 0) {
    const vh = Number(size.slice(0, vhVal))
    const px = window.innerHeight * (vh / 100)
    return px
  } else if (vwVal > 0) {
    const vw = Number(size.slice(0, vwVal))
    const px = window.innerWidth * (vw / 100)
    return px
  } else if (vminVal > 0) {
    const vmin = Number(size.slice(0, vminVal))
    const px = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight * (vmin / 100)
    return px
  } else if (vmaxVal > 0) {
    const vmax = Number(size.slice(0, vmaxVal))
    const px = window.innerWidth < window.innerHeight ? window.innerHeight : window.innerWidth * (vmax / 100)
    return px
  } else if (percentVal > 0) {
    let px = 0
    tryOnMounted(() => {
      const parentHeight = element?.value?.parentElement?.clientHeight || document.documentElement.clientHeight
      const percent = Number(size.slice(0, percentVal))
      px = parentHeight * (percent / 100)
    })
    return px ? px : document.documentElement.clientHeight
  } else {
    return 0
  }
}