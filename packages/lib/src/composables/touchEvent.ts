import { ref } from 'vue-demi'

interface touchPositionInterface {
  isTouch: boolean
  touchStart: number
  touchDistance: number
  touchX: number
  touchY: number
}

/**
 * タッチ座標検出関数
 * @returns touchPosition
 */
export const useTouchEvent = () => {
  const touchPosition = ref<touchPositionInterface>({
    isTouch: false,
    touchStart: 0,
    touchDistance: 0,
    touchX: 0,
    touchY: 0
  })

  const initTouchPosition = () => {
    touchPosition.value = {
      isTouch: false,
      touchStart: 0,
      touchDistance: 0,
      touchX: 0,
      touchY: 0,
    }
  }

  const touchStart = (payload: TouchEvent) => {
    touchPosition.value.touchStart = payload.touches[0].pageY
    touchPosition.value.isTouch = true
  }

  const touchMove = (payload: TouchEvent) => {
    if (touchPosition.value.isTouch) {
      touchPosition.value.touchY = payload.touches[0].pageY

      touchPosition.value.touchDistance = touchPosition.value.touchStart - touchPosition.value.touchY
      if (touchPosition.value.touchDistance > 0) {
        touchPosition.value.touchDistance = 0
      }
    }
  }

  const touchEnd = () => {
    touchPosition.value.isTouch = false
  }

  return {
    touchPosition,

    initTouchPosition,
    touchStart,
    touchMove,
    touchEnd,
  }
}