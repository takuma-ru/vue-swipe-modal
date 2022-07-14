import { ref } from 'vue-demi'

interface mousePositionInterface {
  isActive: boolean,
  x: number,
  y: number
}

export function useMouseEvent() {
  const mousePosition = ref<mousePositionInterface>({
    isActive: false,
    x: 0,
    y: 0
  })
}