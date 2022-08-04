<template>
<div class="code-sandbox">
  <iframe src="https://stackblitz.com/edit/vue-ygmzzp?embed=1&file=src/App.vue&view=preview"></iframe>
</div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.code-sandbox {
  position: relative;
  height: 100%;

  background-color: $black;
  border-radius: 0.8em;
  font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;

  iframe {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;

    border-radius: 0.8em;
    border: 0;
    overflow: hidden;
  }
}
</style>