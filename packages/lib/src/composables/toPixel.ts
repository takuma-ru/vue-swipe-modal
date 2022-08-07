/**
 * px, vh, vw をピクセルサイズに変換し、数値として返す関数
 * @param payload string
 * @returns number
 */
export const toPixel = (payload: string) => {
  if (payload.indexOf('px') > 0) {
    const px = Number(payload.slice(0, payload.indexOf('px')))
    return px
  } else if (payload.indexOf('vh') > 0) {
    const vh = Number(payload.slice(0, payload.indexOf('vh')))
    const px = window.innerHeight * (vh / 100)
    return px
  } else if (payload.indexOf('vw') > 0) {
    const vw = Number(payload.slice(0, payload.indexOf('vw')))
    const px = window.innerWidth * (vw / 100)
    return px
  } else if (payload.indexOf('%') > 0) {
    const pc = Number(payload.slice(0, payload.indexOf('%')))
    const swipeModalEl =  Array.from(document.getElementsByClassName('swipe-modal-takumaru-vue-swipe-modal'))
    const px = swipeModalEl[0].parentNode?.parentElement?.clientHeight! * (pc / 100)
    console.log(swipeModalEl[0], px)
    return px
  } else {
    return 0
  }
}