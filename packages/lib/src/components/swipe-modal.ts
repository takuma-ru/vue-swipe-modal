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
import { rand, TransitionPresets, useTransition } from '@vueuse/core'
import * as CSS from 'csstype'

/* import h, { slot } from '../scripts/h-demi' */
import { useTouchEvent } from '../composables/touchEvent'
import { useMouseEvent } from '../composables/mouseEvent'

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
    const baseNumber = ref(0);
    const cubicBezierNumber = useTransition(baseNumber, {
      duration: 1000,
      transition: [0.75, 0, 0.25, 1],
    });

    const baseColor = ref([0, 0, 0]);
    const colorTransition = useTransition(baseColor, {
      duration: 500,
      transition: TransitionPresets.easeInCubic,
    });
    const color = computed(() => {
      const [r, g, b] = colorTransition.value;
      return `rgb(${r},${g},${b})`;
    });

    const toggle = () => {
      baseNumber.value = baseNumber.value === 100 ? 0 : 100;
      baseColor.value = [rand(0, 255), rand(0, 255), rand(0, 255)];
    };

    /* -- composables -- */
    const {
      mousePosition,
    } = useMouseEvent()
    const {
      touchPosition,
    } = useTouchEvent()

    /* -- variables -- */
    const propsRef = toRefs(props)

    /* -- functions -- */
    const open = () => {
      toggle()
    }

    const close = () => {
      mousePosition.value.isMouseDown = false
      touchPosition.value.isTouch = false
      document.documentElement.style.overflowY = 'auto'
      context.emit('update:modelValue', false)
    }

    /* -- watch -- */
    watch(propsRef.modelValue, () => {
      console.log(propsRef.modelValue.value)
      if (propsRef.modelValue.value) {
        open()
      } else {
        close()
      }
    })

    /* -- life cycle -- */
    onBeforeMount(async () => {
    })

    onMounted(async () => {
      console.log('mounted')
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
            backgroundColor: props.contentsColor,
            width: props.contentsWidth,
          } as StyleValue
        }, context.slots.default?.()/* オプショナルチェーン */) : null,
      ])
    )
  },
})
