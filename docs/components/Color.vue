<template>
  <div class="color-mode">
    {{ colorMode }}
  </div>
</template>

<script lang="ts" setup>
import { useDarkModeStore } from '../store/darkMode';

const {
  colorMode,
} = useDarkModeStore()
</script>

<style scoped>
.color-mode {
}
</style>