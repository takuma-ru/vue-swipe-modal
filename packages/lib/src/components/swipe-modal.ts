import {
  computed,
  defineComponent,
  h,
  ref,
  toRefs,
  onMounted,
  watch,
  onBeforeMount,
  install,
} from 'vue-demi'
import { useTransition } from '@vueuse/core'
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

  emits: ['update:modelValue'],

  setup(props, context) {
    /* -- composables -- */
    const {
      mousePosition,
    } = useMouseEvent()
    const {
      touchPosition,
    } = useTouchEvent()


    /* -- variables -- */
    const propsRef = toRefs(props)
    const modal = computed({
      get: () => propsRef.modelValue.value,
      set: (value: any) => context.emit('update:modelValue', value),
    })

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
      duration: 250,
      transition: [0.25, 0.8, 0.25, 1],
    })


    /* -- functions -- */
    const open = () => {
      // console.log('open')
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
      contentsBottomPosition.value = -1 * toPixel(propsRef.contentsHeight.value)
      backgroundColor.value = [
        parseInt(propsRef.backgroundColor.value.slice(1, 3), 16),
        parseInt(propsRef.backgroundColor.value.slice(3, 5), 16),
        parseInt(propsRef.backgroundColor.value.slice(5, 7), 16),
        0,
      ]
      setTimeout(() => {
        mousePosition.value.isMouseDown = false
        touchPosition.value.isTouch = false
        document.documentElement.style.overflowY = 'auto'
        modal.value = false
      }, 250)
    }


    /* -- watch -- */
    watch(modal, (newVal, oldVal) => {
      if (modal.value) {
        open()
      }
    })


    /* -- life cycle -- */
    onBeforeMount(async () => {
    })


    onMounted(async () => {
    })


    /* -- element -- */
    return () => (
      h('div', {
        class: 'swipe-modal-takumaru-vue-swipe-modal',
      }, [
        propsRef.modelValue.value ? h('div', {
          class: 'modal-background',
          style: {
            backgroundColor: color.value,
          } as StyleValue,
          on: {
            click: () => propsRef.persistent.value ? (() => null) : close()
          },
          onClick: () => { propsRef.persistent.value ? (() => null) : close() }
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
            bottom: `${contentsBottomPositionTransition.value}px`,
          } as StyleValue
        }, [
          !propsRef.noTip.value ? h('div', {
            class: 'modal-contents-chip-wrapper'
          },
            h('div', {
              class: 'modal-contents-chip',
              style: {
                '--tip-color': propsRef.tipColor.value,
              }
            })
          ) : null,
          context.slots.default?.()/* オプショナルチェーン */
        ]) : null,
      ])
    )
  },
})
