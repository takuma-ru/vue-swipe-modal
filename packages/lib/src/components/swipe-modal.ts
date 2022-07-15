import { defineComponent } from 'vue-demi'

import h, { slot } from '../scripts/h-demi'
import { useTouchEvent } from '../composables/touchEvent'

import '../components/swipe-modal.scss'

export default defineComponent({
  name: 'swipeModal',

  props: {

  },

  setup(props, ctx) {
    const {
      touchPosition
    } = useTouchEvent()

    return () => h('h1', { class: 'hello' }, 'text')
  },
})