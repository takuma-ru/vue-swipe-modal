import {
  computed,
  defineComponent,
  h,
  ref,
  toRefs,
  watch,
  install,
} from 'vue-demi'
import {
  useCssVar,
  useTransition
} from '@vueuse/core'
import * as CSS from 'csstype'

/* import h, { slot } from '../scripts/h-demi' */
import { useTouchEvent } from '../composables/touchEvent'
import { useMouseEvent } from '../composables/mouseEvent'
import { toPixel } from '../composables/toPixel'

import '../components/swipe-modal.scss'

interface CSSProperties extends CSS.Properties<string | number> {}
type StyleValue = CSSProperties | Array<StyleValue>

install()

export default defineComponent({
  name: 'swipeModal',

  model: {
    prop: 'modelValue',
    event: 'update:modelValue',
  },

  props: {
    // modal
    modelValue: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    // modal_background
    persistent: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String,
      default: '#80808080',
    },
    // modal_contents
    fullscreen: {
      type: Boolean,
      default: false,
    },
    noTip: {
      type: Boolean,
      default: false,
    },
    contentsWidth: {
      type: String,
      default: '100%',
    },
    contentsHeight: {
      type: String,
      default: '30vh',
    },
    borderTopRadius: {
      type: String,
      default: null,
    },
    borderTopLeftRadius: {
      type: String,
      default: '0px',
    },
    borderTopRightRadius: {
      type: String,
      default: '0px',
    },
    contentsColor: {
      type: String,
      default: 'white',
    },
    tipColor: {
      type: String,
      default: '#c8c8c8',
    },
    darkContentsColor: {
      type: String,
      default: '#1E1E1E',
    },
  },

  emits: ['update:modelValue', 'open', 'close'],

  setup(props, context) {
    /* -- composables -- */
    const {
      mousePosition,
      initMousePosition,
      mouseDown,
      mouseMove,
      mouseUp,
    } = useMouseEvent()
    const {
      touchPosition,
      initTouchPosition,
      touchStart,
      touchMove,
      touchEnd,
    } = useTouchEvent()


    /* -- variables -- */
    const propsRef = toRefs(props)
    const modal = computed({
      get: () => propsRef.modelValue.value,
      set: (value: any) => context.emit('update:modelValue', value),
    })
    const contentsBottomPositionTransitionDuration = ref(250)

    /* -- css var -- */
    const el = ref(null)
    const tipColor = useCssVar('--tip-color', el)
    tipColor.value = propsRef.tipColor.value

    /* -- transition -- */
    const backgroundColor = ref([
      parseInt(propsRef.backgroundColor.value.slice(1, 3), 16),
      parseInt(propsRef.backgroundColor.value.slice(3, 5), 16),
      parseInt(propsRef.backgroundColor.value.slice(5, 7), 16),
      0
    ])
    const backgroundColorEnterTransition = useTransition(backgroundColor, {
      duration: 250,
      transition: [0.25, 0.8, 0.25, 1],
    })
    const color = computed(() => {
      const [r, g, b, a] = backgroundColorEnterTransition.value;
      return `rgba(${r}, ${g}, ${b}, ${a})`
    })

    const contentsBottomPosition = ref(-1 * toPixel(propsRef.contentsHeight.value))
    const contentsBottomPositionTransition = useTransition(contentsBottomPosition, {
      duration: contentsBottomPositionTransitionDuration.value,
      transition: [0.25, 0.8, 0.25, 1],
    })
    const contentsBottomDistance = computed(() => {
      const distance = contentsBottomPositionTransition.value + (Math.abs(touchPosition.value.touchDistance) > Math.abs(mousePosition.value.mouseDistance) ? touchPosition.value.touchDistance : mousePosition.value.mouseDistance )
      return distance
    })


    /* -- functions -- */
    const init = () => {
      document.documentElement.style.overflowY = 'auto'
      modal.value = false
    }

    const open = () => {
      // console.log('open')
      context.emit('open')
      contentsBottomPosition.value = 0
      backgroundColor.value = [
        parseInt(propsRef.backgroundColor.value.slice(1, 3), 16),
        parseInt(propsRef.backgroundColor.value.slice(3, 5), 16),
        parseInt(propsRef.backgroundColor.value.slice(5, 7), 16),
        parseInt(propsRef.backgroundColor.value.slice(7, 9), 16) / 255
      ]
    }

    const close = () => {
      // console.log('close')
      contentsBottomPosition.value = -1 * toPixel(propsRef.contentsHeight.value) - (Math.abs(touchPosition.value.touchDistance) > Math.abs(mousePosition.value.mouseDistance) ? touchPosition.value.touchDistance : mousePosition.value.mouseDistance )
      backgroundColor.value = [
        parseInt(propsRef.backgroundColor.value.slice(1, 3), 16),
        parseInt(propsRef.backgroundColor.value.slice(3, 5), 16),
        parseInt(propsRef.backgroundColor.value.slice(5, 7), 16),
        0,
      ]
      setTimeout(() => {
        initMousePosition()
        initTouchPosition()
        init()
        context.emit('close')
      }, contentsBottomPositionTransitionDuration.value)
    }

    const onTouchEnd = () => {
      touchEnd()
      if (-1 * touchPosition.value.touchDistance > toPixel(propsRef.contentsHeight.value) / 8) {
        close()
      } else {
        touchPosition.value.touchDistance = 0
      }
    }

    const onMouseUp = () => {
      mouseUp()
      if (-1 * mousePosition.value.mouseDistance > toPixel(propsRef.contentsHeight.value) / 8) {
        close()
      } else {
        mousePosition.value.mouseDistance = 0
      }
    }


    /* -- watch -- */
    watch(modal, (newVal, oldVal) => {
      if (modal.value) {
        open()
      }
    })


    /* -- life cycle -- */


    /* -- element -- */
    return () => (
      h('div', {
        class: 'swipe-modal-takumaru-vue-swipe-modal',
        on: {
          mousemove: mouseMove,
          mouseup: onMouseUp,
        },
        onMousemove: mouseMove,
        onMouseup: onMouseUp,
      }, [
        propsRef.modelValue.value ? h('div', {
          class: 'modal-background',
          style: {
            backgroundColor: color.value,
          } as StyleValue,
          on: {
            onMouseup: () => propsRef.persistent.value ? (() => null) : close(),
            click: () => propsRef.persistent.value ? (() => null) : close(),
          },
          onMouseup: () => { propsRef.persistent.value ? (() => null) : close() },
          onClick: () => { propsRef.persistent.value ? (() => null) : close() },
        }) : null,
        propsRef.modelValue.value ? h('div', {
          class: 'modal-contents',
          style: {
            width: propsRef.contentsWidth.value,
            minHeight: propsRef.contentsHeight.value,
            borderTopLeftRadius: propsRef.borderTopRadius.value ? propsRef.borderTopRadius.value : propsRef.borderTopLeftRadius.value,
            borderTopRightRadius: propsRef.borderTopRadius ? propsRef.borderTopRadius.value : propsRef.borderTopRightRadius.value,
            backgroundColor: propsRef.dark.value ? propsRef.darkContentsColor.value : propsRef.contentsColor.value,
            color: propsRef.dark.value ? 'white' : 'black',
            bottom: `${contentsBottomDistance.value}px`,
          } as StyleValue,
          on: {
            touchstart: touchStart,
            touchmove: touchMove,
            touchend: onTouchEnd,
          },
          onTouchstart: touchStart,
          onTouchmove: touchMove,
          onTouchend: onTouchEnd,
        }, [
          !propsRef.noTip.value ? h('div', {
              class: 'modal-contents-chip-wrapper',
              on: {
                mousedown: mouseDown,
              },
              onMousedown: mouseDown,
            },[
              h('div', {
                class: 'modal-contents-chip',
              })
            ]
          ) : null,
          context.slots.default?.()/* オプショナルチェーン */
        ]) : null,
      ])
    )
  },
})
