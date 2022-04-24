<script lang="ts">
import { defineComponent, ref } from 'vue';
import SwipeModal from './components/swipe-modal.vue';
export default defineComponent({
  name: 'ServeDev',
  components: {
    SwipeModal
  },
  setup() {
    const modal = ref(false)
    return {
      modal
    }
  }
});
</script>

<template>
  <div id="app">
    dev mode
    <div class="modal_button">
      <button @click="modal = true">
        <span>
          modal1 OPEN: {{ modal }}
        </span>
      </button>
    </div>

    <swipe-modal
      v-model:modal="modal"
      border-top-radius="24px"
      contents-height="50vh"
    >
      <div style="padding: 24px">
        <div v-for="i in 100" :key="i">
          {{ i }}
        </div>
      </div>
    </swipe-modal>
  </div>
</template>