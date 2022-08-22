<template>
  <code class="inline-code">
    <slot />
  </code>
</template>

<script lang="ts" setup>
import { useColorStore } from '~~/store/colorStore';

const {
  color
} = useColorStore()
</script>

<style lang="scss">
.inline-code {
  padding: 0.2em 0.4em;
  margin: 0px 0.25em;

  color: v-bind('color.white.darken[2]');
  font-size: 0.8em;
  border-radius: 0.4em;
  background-color: #2B2B2B91;
}
</style>