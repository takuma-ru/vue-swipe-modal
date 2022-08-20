<template>
  <header>
    <div
      class="title"
      @click="navigateTo('/')"
    >
      <img src="https://user-images.githubusercontent.com/49429291/182005504-0567f54a-80e3-4a31-ba5b-740db91b5190.png" alt="">
      <h3>vue-swipe-modal</h3>
    </div>
    <div class="icons">
      <ColorModeButton />
    </div>
    <hr>
  </header>
</template>

<script lang="ts" setup>

import { useColorModeStore } from '~~/store/colorModeStore';
import { useColorStore } from '~~/store/colorStore';
import { useDeviceStatusStore } from '~~/store/deviceStatusStore';


const {
  colorMode
} = useColorModeStore()

const {
  color
} = useColorStore()

const {
  isMobileMixin
} = useDeviceStatusStore()

</script>

<style lang="scss" scoped>
header {
  display: grid;
  justify-content: space-between;
  align-items: center;
  grid-template-columns: 1fr auto;

  position: fixed;
  z-index: 10;
  width: v-bind('isMobileMixin("calc(100vw - 32px)", "calc(100vw - 384px - 32px)")');
  height: 64px;
  margin: 0px v-bind('isMobileMixin("0px", "192px")');

  padding: 0px 16px;

  .title {
    display: grid;
    justify-content: start;
    align-items: center;
    grid-template-columns: auto auto;

    height: 100%;

    cursor: pointer;
  }

  .icons {
    justify-self: end;
  }

  img {
    height: 56px;
  }

  hr {
    position: absolute;
    width: 100%;
    height: 1px;

    bottom: 0px;
    margin: 0px;

    background-color: v-bind('colorMode === "light" ? color.black.lighten[2] :  color.black.lighten[1]');
    border: none;
  }
}
</style>