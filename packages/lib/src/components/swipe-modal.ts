import { computed, defineComponent, h, ref } from 'vue-demi'

/* import { slot } from '../scripts/h-demi' */
import { useTouchEvent } from '../composables/touchEvent'

import '../components/swipe-modal.scss'
export default defineComponent({
  name: 'swipeModal',

  props: {

  },

  setup(props, context) {
    const {
      touchPosition
    } = useTouchEvent()

    return () => h( 'div' , {
      class: 'swipe-modal-takumaru-vue-swipe-modal',
    }, [

      h('div', {
        class: 'modal-background',
        style: 'background-color: #80808080'
      }),

      h('div', {
        class: 'modal-contents',
        style: {
          backgroundColor: '#FFFFFF',
          width: '100vw',
        }
      }, context.slots.default?.()),

    ])
  },
})