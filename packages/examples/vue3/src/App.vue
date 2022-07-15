<template>
  <div>
    <swipe-modal />
  </div>
</template>

<script setup lang="ts">
/* import swipeModal from '../../../lib' */
import swipeModal from '@takuma-ru/vue-swipe-modal'

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
