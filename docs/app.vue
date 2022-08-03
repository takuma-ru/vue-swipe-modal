<template>
  <div :color-mode="colorMode">
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useDarkModeStore } from './store/darkMode.js';

const {
  colorMode,
  setSystemColorMode,
} = useDarkModeStore()

onMounted(() => {
  setSystemColorMode()
})
</script>

<style lang="scss">
html {
  background-color: $white-darken-1;
  color: $black;
  font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;
}

@media (prefers-color-scheme: dark) {
  html {
    background-color: $black-darken-2;
    color: $white;
  }
}

body {
  margin: 0px;
}

h1, h2, h3, h4, p {
  margin: 0px;
}

h1 {
  position: relative;
  padding-bottom: 0.25em;
  margin-bottom: 0.5em;

  &::before {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    bottom: 0px;

    background-color: $black-lighten-2;
  }
}

h2, h3, h4 {
  position: relative;

  &:hover {
    &::before {
      content: '#';
      position: absolute;
      left: -1em;
      @media (prefers-color-scheme: dark) {
        color: $black-lighten-1;
      }
    }
  }

  a {
    color: white;
    text-decoration: none;
  }
}

p {
  padding-bottom: 0.5em;
}

ul {
  margin: 0.5em 0px;
}

.material-symbols-rounded {
  color: $white;
}
</style>