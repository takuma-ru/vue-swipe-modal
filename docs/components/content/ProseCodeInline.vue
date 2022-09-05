<template>
  <code class="inline-code">
    <slot />
  </code>
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

<style lang="scss">
.inline-code {
  padding: 0.2em 0.4em;
  margin: 0px 0.25em;

  color: v-bind('color.theme.text');
  font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;
  font-size: 0.8em;
  border-radius: 0.4em;
  background-color: v-bind('colorMode === "light" ? "#00000030" : "#FFFFFF30"');
}
</style>