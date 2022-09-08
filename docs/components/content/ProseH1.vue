<template>
  <h1><slot /></h1>
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
h1 {
  position: relative;
  padding-bottom: 0.5em;
  margin-bottom: 0.5em;

  &::before {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    bottom: 0px;

    background-color: v-bind('colorMode === "light" ? color.black.lighten[2] :  color.black.lighten[1]');
  }
}
</style>