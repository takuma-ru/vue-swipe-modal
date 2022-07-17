import {
  computed,
  defineComponent,
  h,
  ref,
  toRefs,
  onMounted,
  isVue2,
} from 'vue-demi'
import { StyleValue } from 'vue'
/* import anime from 'animejs' */

/* import h, { slot } from '../scripts/h-demi' */
import { useTouchEvent } from '../composables/touchEvent'
import { useMouseEvent } from '../composables/mouseEvent'

import '../components/swipe-modal.scss'
import anime from 'animejs'

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
    // composables
    const {
      mousePosition,
    } = useMouseEvent()
    const {
      touchPosition,
    } = useTouchEvent()

    // variables
    const propsRef = toRefs(props)

    // method
    const close = () => {
      mousePosition.value.isMouseDown = false
      touchPosition.value.isTouch = false
      document.documentElement.style.overflowY = 'auto'
      context.emit('update:modelValue', false)
    }

    // life cycle
    onMounted(() => {
      console.log('mounted')
      anime({
        targets: '.modal-background',
        opacity: [0, 1],
        duration: 30000,
        easing: 'easeInOutCubic'
      })
    })

    /* console.log(isVue2) */
    if (isVue2) {
      return () => (
        propsRef.modelValue.value ? h( 'div' , {
          class: 'swipe-modal-takumaru-vue-swipe-modal',
        }, [
          h('div', {
            class: 'modal-background',
            style: {
              backgroundColor: props.backgroundColor,
            } as StyleValue,
            on: {
              click: () => propsRef.persistent.value ? (() => null) : close()
            },
          }),
          h('div', {
            class: 'modal-contents',
            style: {
              backgroundColor: props.contentsColor,
              width: props.contentsWidth,
            } as StyleValue
          }, context.slots.default?.()),
        ])
        : null
      )
    } else {
      return () => (
        propsRef.modelValue.value ? h( 'div' , {
          class: 'swipe-modal-takumaru-vue-swipe-modal',
        }, [
          h('div', {
            class: 'modal-background',
            style: {
              backgroundColor: props.backgroundColor,
            } as StyleValue,
            onClick: () => { propsRef.persistent.value ? (() => null) : close() }
          }),
          h('div', {
            class: 'modal-contents',
            style: {
              backgroundColor: props.contentsColor,
              width: props.contentsWidth,
            } as StyleValue
          }, context.slots.default?.()),
        ])
        : null
      )
    }
  },
})