<template>
  <hr>
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
  hr {
    width: 100%;
    height: 1px;

    bottom: 0px;

    /* background-color: v-bind('colorMode === "light" ? color.black.lighten[2] :  color.black.lighten[1]'); */
    background-color: transparent;
    border: none;
  }
</style>