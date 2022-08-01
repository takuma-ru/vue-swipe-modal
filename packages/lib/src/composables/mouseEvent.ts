import { ref } from 'vue-demi'

interface mousePositionInterface {
  isMouseDown: boolean
  mouseDistance: number
  mouseX: number
  mouseY: number
}

/**
 * マウス座標検出関数
 * @returns touchPosition
 */
export function useMouseEvent() {
  const mousePosition = ref<mousePositionInterface>({
    isMouseDown: false,
    mouseDistance: 0,
    mouseX: 0,
    mouseY: 0
  })

  return {
    mousePosition,
  }
}