import { ref } from 'vue-demi'

interface mousePositionInterface {
  isMouseDown: boolean
  distance: number
  x: number
  y: number
}

/**
 * マウス座標検出関数
 * @returns touchPosition
 */
export function useMouseEvent() {
  const mousePosition = ref<mousePositionInterface>({
    isMouseDown: false,
    distance: 0,
    x: 0,
    y: 0
  })

  return {
    mousePosition,
  }
}