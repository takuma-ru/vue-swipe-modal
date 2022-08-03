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
</script>

<style lang="scss" scoped>
.material-symbols-rounded {
  color: $white;
}
</style>