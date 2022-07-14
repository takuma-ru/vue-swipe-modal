import { ref } from 'vue-demi'

interface touchPositionInterface {
  isActive: boolean,
  x: number,
  y: number
}

export function useTouchEvent() {
  const touchPosition = ref<touchPositionInterface>({
    isActive: false,
    x: 0,
    y: 0
  })

  return {
    touchPosition,
  }
}