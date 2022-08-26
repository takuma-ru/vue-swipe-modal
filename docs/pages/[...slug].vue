<template>
  <main>
    <ContentDoc
      :style="{
        minHeight: 'calc(100% - 32px - 32px)',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 0px',
      }"
    />
  </main>
</template>

<script lang="ts" setup>
import { useColorModeStore } from '~~/store/colorModeStore';
import { useColorStore } from '../store/colorStore';

const {
  colorMode
} = useColorModeStore()

const {
  color
} = useColorStore()
</script>

<style lang="scss">
main {
  position: relative;
  max-width: 100%;
  padding: 0px 16px;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: v-bind('color.black.lighten[2]');
    border-radius: 2px;
    border-right: 2px solid transparent;
    border-left: 2px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-track {
    margin-top: 2px;
    margin-bottom: 2px;
  }

  h1, h2, h3, h4, p {
    margin: 0px;
  }

  h2, h3, h4 {
    position: relative;
    padding: 0.25em 0px;
    margin: 0.5em 0px;

    &:hover {
      &::before {
        content: '#';
        position: absolute;
        left: -1rem;
        color: v-bind('color.theme.subText');
      }
    }

    a {
      color: v-bind('color.theme.text');
      text-decoration: none;
    }
  }

  p {
    padding-bottom: 0.5em;
  }

  ul {
    margin: 0.5em 0px;
  }
}
</style>