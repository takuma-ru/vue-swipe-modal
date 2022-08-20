<template>
  <main>
    <ContentDoc style="min-height: calc(100% - 32px); display: flex; flex-direction: column; padding-bottom: 32px" />
  </main>
</template>

<script lang="ts" setup>
import { useColorStore } from '../store/colorStore';

const {
  color
} = useColorStore()
</script>

<style lang="scss">
main {
  position: relative;
  max-width: 100%;
  padding: 0px 16px;
  margin-top: 32px;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background: v-bind('color.black.lighten[1]');
    border-radius: 4px;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-track {
    margin-top: 4px;
    margin-bottom: 4px;
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

      background-color: v-bind('color.theme.text');
    }
  }

  h2, h3, h4 {
    position: relative;
    padding: 0.25em 0px;
    margin: 0.5em 0px;

    &:hover {
      &::before {
        content: '#';
        position: absolute;
        left: -1em;
        color: v-bind('color.theme.text');
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