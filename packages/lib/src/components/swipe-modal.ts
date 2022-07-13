import { defineComponent } from 'vue-demi'

import h, { slot } from '../scripts/h-demi'


export default defineComponent({
  name: 'swipe-modal',

  props: {

  },

  setup(props, ctx) {
    return () => h('h1', {}, 'text')
  },
})