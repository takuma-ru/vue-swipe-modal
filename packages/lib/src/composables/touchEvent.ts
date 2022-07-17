import { ref } from 'vue-demi'

interface touchPositionInterface {
  isTouch: boolean,
  x: number,
  y: number
}

export function useTouchEvent() {
  const touchPosition = ref<touchPositionInterface>({
    isTouch: false,
    x: 0,
    y: 0
  })

  return {
    touchPosition,
  }
}