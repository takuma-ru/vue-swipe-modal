import { ref } from 'vue-demi'

interface touchPositionInterface {
  isTouch: boolean,
  distance: number
  x: number,
  y: number
}

/**
 * タッチ座標検出関数
 * @returns touchPosition
 */
export const useTouchEvent = () => {
  const touchPosition = ref<touchPositionInterface>({
    isTouch: false,
    distance: 0,
    x: 0,
    y: 0
  })

  return {
    touchPosition,
  }
}