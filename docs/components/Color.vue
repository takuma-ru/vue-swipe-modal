<template>
  <div class="color-mode">
  <Icon @click="click()">{{ colorMode === 'dark' ? 'dark_mode' : 'light_mode' }}</Icon>
  </div>
</template>

<script lang="ts" setup>
import { useDarkModeStore } from '../store/darkMode';
import { useColorStore } from '../store/color';

const {
  colorMode,
  switchMode,
} = useDarkModeStore()

const {
  setDarkTheme,
  setLightTheme,
} = useColorStore()

const click = () => {
  switchMode()

  if (colorMode.value === 'dark') {
    setDarkTheme()
  } else {
    setLightTheme()
  }
}
</script>

<style scoped>
.color-mode {
  cursor: pointer;
}
</style>