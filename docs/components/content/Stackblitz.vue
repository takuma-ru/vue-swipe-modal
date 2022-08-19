<template>
<div class="code-sandbox">
  <iframe :src="`https://stackblitz.com/edit/vue-ygmzzp?ctl=1&embed=1&file=src/App.vue&hideExplorer=1&hideNavigation=1&theme=${colorMode}&view=preview`"></iframe>
</div>
</template>

<script lang="ts" setup>
import { useColorModeStore } from '~~/store/colorModeStore';
import { useColorStore } from '~~/store/colorStore';

const {
  colorMode
} = useColorModeStore()

const {
  color
} = useColorStore()
</script>

<style lang="scss" scoped>
.code-sandbox {
  flex: 1;

  position: relative;

  display: flex;;

  background-color: v-bind('color.theme.darken[1]');
  border-radius: 0.8em;
  font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;

  iframe {
    position: relative;
    z-index: 1;
    width: 100%;
    padding: 0px;

    border-radius: 0.8em;
    border: 0;
    overflow: hidden;
  }
}
</style>