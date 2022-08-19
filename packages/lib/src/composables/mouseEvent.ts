import { ref } from 'vue-demi'

interface mousePositionInterface {
  isMouseDown: boolean
  downStart: number
  mouseDistance: number
  mouseX: number
  mouseY: number
}

/**
 * マウス座標検出関数群
 * @returns touchPosition
 */
export function useMouseEvent() {
  const mousePosition = ref<mousePositionInterface>({
    isMouseDown: false,
    downStart: 0,
    mouseDistance: 0,
    mouseX: 0,
    mouseY: 0
  })

  /**
   * mousePosition初期化
   */
  const initMousePosition = ()=> {
    mousePosition.value = {
      isMouseDown: false,
      downStart: 0,
      mouseDistance: 0,
      mouseX: 0,
      mouseY: 0
    }
  }

  /**
   * 画面をクリックした位置を取得し、記録する関数
   * @param payload MouseEvent
   */
  const mouseDown = (payload: MouseEvent) => {
    mousePosition.value.isMouseDown = true
    mousePosition.value.downStart = payload.pageY
  }

  /**
   * クリックしながら画面上を動かした距離を算出し、記録する関数
   * @param payload MouseEvent
   */
  const mouseMove = (payload: MouseEvent) => {
    if (mousePosition.value.isMouseDown) {
      mousePosition.value.mouseY = payload.pageY

      mousePosition.value.mouseDistance = mousePosition.value.downStart - mousePosition.value.mouseY
      if (mousePosition.value.mouseDistance > 0) {
        mousePosition.value.mouseDistance = 0
      }
    }
  }

  /**
   * 画面をクリックしているかどうかのフラグを折る
   */
  const mouseUp = () => {
    mousePosition.value.isMouseDown = false
  }

  return {
    mousePosition,

    initMousePosition,
    mouseDown,
    mouseMove,
    mouseUp,
  }
}