<template>
  <div class="color-mode">
    <Icon @click="click()">
      {{ colorMode === 'dark' ? 'dark_mode' : 'light_mode' }}
    </Icon>
  </div>
</template>

<script lang="ts" setup>
import { useColorModeStore } from '../store/colorModeStore'
import { useColorStore } from '../store/colorStore'

const {
  colorMode,
  switchMode
} = useColorModeStore()

const {
  setDarkTheme,
  setLightTheme
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
  height: 24px;

  cursor: pointer;
}
</style>
