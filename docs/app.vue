<template>
  <div id="app">
    <Header />
    <div class="contents">
      <Nav />
      <NuxtPage />
    </div>
    <NuxtLoading ref="loading" />
  </div>
</template>

<script lang="ts" setup>
import 'material-symbols';
import { useColorModeStore } from './store/colorModeStore'
import { useColorStore } from './store/colorStore'
import { useDeviceStatusStore } from './store/deviceStatusStore';

const nuxtApp = useNuxtApp()

const {
  setSytemMode
} = useColorModeStore()

const {
  colorMode
} = useColorModeStore()

const {
  color,
  setDarkTheme,
  setLightTheme,
} = useColorStore()

const {
  isMobile,
  isMobileMixin,
  getThisDisplaySize
} = useDeviceStatusStore()

const loading = ref()

setSytemMode()
getThisDisplaySize()

nuxtApp.hook('page:start', () => {
  loading.value.start()
})
nuxtApp.hook('page:finish', () => {
  loading.value.finish()
  window.scrollTo(0, 0)
})
</script>

<style lang="scss">
#app {
  background-color: v-bind('color.theme.background');
  color: v-bind('color.theme.text');
}

.contents {
  display: grid;
  grid-template-columns: v-bind('isMobileMixin("100%", "256px calc(100% - 256px)")');

  position: relative;
  height: calc(100vh - 64px);
  padding-top: 64px;
  margin: 0px v-bind('isMobileMixin("0px", "10vw")');
}

body {
  margin: 0px;

  font-family: Inter, sans-serif;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background: v-bind('color.black.lighten[2]');
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
</style>