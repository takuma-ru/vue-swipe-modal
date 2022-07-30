import { ref } from 'vue-demi'

interface touchPositionInterface {
  isTouch: boolean,
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
    x: 0,
    y: 0
  })

  return {
    touchPosition,
  }
}