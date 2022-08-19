<template>
  <div id="app">
    <Header />
    <div class="contents">
      <Nav />
      <NuxtPage />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useColorModeStore } from './store/colorModeStore'
import { useColorStore } from './store/colorStore'

const {
  setSytemMode
} = useColorModeStore()

const {
  color,
  setDarkTheme,
  setLightTheme,
} = useColorStore()

setSytemMode()

</script>

<style lang="scss">
#app {
  background-color: v-bind('color.theme.background');
  color: v-bind('color.theme.text');
  font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;
}

body {
  margin: 0px;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background: v-bind('color.black.lighten[1]');
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
  background-color: v-bind('color.theme.text');
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