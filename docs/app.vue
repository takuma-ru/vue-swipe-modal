<template>
  <div id="app" :color-mode="colorMode">
    <Header />
    <div class="contents">
      <Nav />
      <NuxtPage />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useDarkModeStore } from './store/darkMode.js';
import { useColorStore } from './store/color.js';

const {
  colorMode,
  setDark,
  setLight
} = useDarkModeStore()

const {
  color,
  cssColor,
  setDarkTheme,
  setLightTheme,
} = useColorStore()

onBeforeMount(() => {
  console.log('setSystemColorMode', window.matchMedia('(prefers-color-scheme: dark)').matches)
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setDark()
    setDarkTheme()
  } else {
    setLight()
    setLightTheme()
  }
})

</script>

<style lang="scss">
#app {
  background-color: v-bind(cssColor('theme', 'background'));
  color: v-bind(cssColor('theme', 'text'));
  font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;
}

body {
  margin: 0px;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background: $black-lighten-1;
    border-radius: 6px;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-track {
    margin-top: 4px;
    margin-bottom: 4px;
  }
}

h1, h2, h3, h4, p {
  margin: 0px;
}

hr {
  background-color: v-bind(cssColor('theme', 'text'));
}

.contents {
  display: grid;
  grid-template-columns: 256px calc(100% - 256px);

  position: relative;
  height: calc(100vh - 64px);
  padding-top: 64px;
  margin: 0px 10vmin;
}
</style>