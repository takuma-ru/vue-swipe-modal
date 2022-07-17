import { ref } from 'vue-demi'

interface mousePositionInterface {
  isMouseDown: boolean,
  x: number,
  y: number
}

export function useMouseEvent() {
  const mousePosition = ref<mousePositionInterface>({
    isMouseDown: false,
    x: 0,
    y: 0
  })

  return {
    mousePosition,
  }
}