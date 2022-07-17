import { computed, defineComponent, h, ref, toRefs } from 'vue-demi'
import { StyleValue } from 'vue'

/* import { slot } from '../scripts/h-demi' */
import { useTouchEvent } from '../composables/touchEvent'
import '../components/swipe-modal.scss'

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
    const propsRef = toRefs(props)

    const {
      touchPosition
    } = useTouchEvent()

    return () => (
      propsRef.modelValue.value ? h( 'div' , {
        class: 'swipe-modal-takumaru-vue-swipe-modal',
      }, [
        h('div', {
          class: 'modal-background',
          style: {
            backgroundColor: props.backgroundColor,
          } as StyleValue
        }),
        h('div', {
          class: 'modal-contents',
          style: {
            backgroundColor: props.contentsColor,
            width: props.contentsWidth,
          } as StyleValue
        }, [context.slots.default?.()]),
      ])
      : null
    )
  },
})