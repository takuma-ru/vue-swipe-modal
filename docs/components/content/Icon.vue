<template>
  <span
    class="material-symbols-rounded"
    :style="{
      fontSize: size,
    }"
  >
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { useColorStore } from '../../store/color';

defineProps({
  icon: {
    type: String,
    default: 'code'
  },
  size: {
    type: String,
    default: '24px'
  }
})

const {
  cssColor
} = useColorStore()
</script>

<style lang="scss" scoped>
.material-symbols-rounded {
  color: v-bind(cssColor('theme', 'text'));

  user-select: none
}
</style>