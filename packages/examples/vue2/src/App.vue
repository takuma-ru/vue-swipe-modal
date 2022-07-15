<template>
  <div id="app">
    <swipe-modal></swipe-modal>
    {{ modal }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { swipeModal } from '../../../lib/dist/swipe-modal.es'

@Component({
  components: {
    swipeModal,
  },

  data() {
    return {
      modal: true
    }
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
