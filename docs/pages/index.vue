<template>
  <div id="index">
    <div class="title">
      <img src="https://user-images.githubusercontent.com/49429291/182005504-0567f54a-80e3-4a31-ba5b-740db91b5190.png" alt="logo">
      <div class="description">
        <h1 name>@takuma-ru/vue-swipe-modal</h1>
        <h1 detail>Modal window that can be swiped to close</h1>
        <h1 author>takuma-ru</h1>
      </div>
    </div>
    <div class="buttons">
      <Btn
        icon="start"
        :color="color.green.default"
        to="/started/vue3"
        style="margin: 0.5em 0em"
      >
        Get Start
      </Btn>
      <Btn
        outlined
        icon="format_list_bulleted"
        :color="color.green.default"
        to="/props"
        style="margin: 0.5em 0em"
      >
        Props
      </Btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useColorStore } from '~~/store/colorStore';
import { useDeviceStatusStore } from '~~/store/deviceStatusStore';

useMeta({
  title: '@takuma-ru/vue-swipe-modal'
})

const {
  color
} = useColorStore()

const {
  isMobile,
  isMobileMixin
} = useDeviceStatusStore()
</script>

<style lang="scss" scoped>
#index {
  grid-column: 1/3;

  padding: 1em;

  overflow-y: auto;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: v-bind('isMobileMixin("column", "row")');

    min-height: 50vh;

    .description {
      display: flex;
      flex-flow: column;
    }

    h1 {
      position: relative;

      margin-top: 1.2em;
      padding: 0px;

      &[name] {
        &::before {
          content: 'Name is';
        }
      }

      &[detail] {
        &::before {
          content: 'This is';
        }
      }

      &[author] {
        &::before {
          content: 'Made by';
        }
      }

      &::before {
        content: 'This is';

        position: absolute;
        top: -1.3em;

        font-size: 0.6em;
        font-weight: 400;
        color: v-bind('color.theme.subText');
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;

    margin: 2em 0px;
  }

  img {
    height: min(40vw, 240px);
  }
}
</style>
