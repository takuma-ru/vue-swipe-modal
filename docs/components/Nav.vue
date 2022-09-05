<template>
  <nav v-show="nowPath !== '/' && !isMobile()">
    <div
      v-for="group in navLinks"
      :key="group.name"
    >
      <div class="group-name">
        <Icon
          size="20px"
          :color="color.theme.subText"
          style="margin-right: 0.5em"
        >
          {{ group.icon }}
        </Icon>
        <h3>
          {{ group.name }}
        </h3>
      </div>

      <div
        v-for="link in group.links"
        :key="link.name"
      >
        <div :class="link.link === nowPath ? 'link-select' : 'link'">
          <nuxt-link
            :to="link.link"
          >
            {{ link.name }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useColorModeStore } from '~~/store/colorModeStore';
import { useDeviceStatusStore } from '~~/store/deviceStatusStore';
import { useColorStore } from '../store/colorStore';

type NavLinksType = Array<{
  name: string
  icon: string
  links: Array<{
    name: string,
    link: string
  }>
}>

/* -- store -- */
const {
  colorMode
} = useColorModeStore()

const {
  color
} = useColorStore()

const {
  isMobile
} = useDeviceStatusStore()

/* -- variables -- */
const route = useRoute()

const nowPath = computed(() => {
  return route.path
})

const navLinks = ref<NavLinksType>([
  {
    name: 'Get started',
    icon: 'start',
    links: [
      { name: '2.x', link: '/started/vue2' },
      { name: '3.x', link: '/started/vue3' },
      { name: 'nuxt2.x', link: '/started/nuxt2' },
      { name: 'nuxt3.x', link: '/started/nuxt3' },
    ]
  },
  {
    name: 'Props',
    icon: 'format_list_bulleted',
    links: [
      { name: 'index', link: '/props' },
      { name: 'contents-height', link: '/props/contents-height' },
      { name: 'contents-width', link: '/props/contents-width' },
      { name: 'dark', link: '/props/dark' },
      { name: 'v-modal', link: '/props/v-modal' },
      { name: 'persistent', link: '/props/persistent' },
      { name: 'background-color', link: '/props/background-color' },
      { name: 'fullscreen', link: '/props/fullscreen' },
      { name: 'no-tip', link: '/props/no-tip' },
      { name: 'border-top-radius', link: '/props/border-top-radius' },
      { name: 'border-top-left-radius', link: '/props/border-top-left-radius' },
      { name: 'border-top-right-radius', link: '/props/border-top-right-radius' },
      { name: 'contents-color', link: '/props/contents-color' },
      { name: 'tip-color', link: '/props/tip-color' },
      { name: 'dark-contents-color', link: '/props/dark-contents-color' },
    ]
  },
  {
    name: 'Demo',
    icon: 'terminal',
    links: [
      { name: 'index', link: '/demo' },
    ]
  }
])
</script>

<style scoped lang="scss">
nav {
  position: relative;
  width: calc(256px - 32px);
  min-height: calc(100% - 32px - 32px);
  padding: 0px 16px;
  margin: 32px 0px;

  overflow: auto;

  &::before {
    content: '';
    position: absolute;
    width: calc(256px - 32px);
    height: 2em;
    bottom: 0%;

    background-image: linear-gradient(#00000000, v-bind('color.theme.background'));
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: v-bind('colorMode === "light" ? color.black.lighten[2] : color.black.lighten[1]');
    border-radius: 3.75px;
    border-right: 2px solid transparent;
    border-left: 2px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-track {
    margin-top: 2px;
    margin-bottom: 2px;
  }

  .group-name {
    display: flex;
    align-items: center;
  }

  .link {
    margin: 1em 0px;
    padding-left: 2em;

    &-select {
      position: relative;
      margin: 1em 0px;
      padding-left: 2em;

      &::before {
        content: '';

        position: absolute;
        width: 8px;
        height: 100%;
        left: 1em;

        border-radius: 2px;
        background-color: v-bind('color.green.default');
      }

      a {
        color: v-bind('color.theme.text');
        text-decoration: none;
        cursor: pointer;
      }
    }

    a {
      color: v-bind('color.theme.text');
      text-decoration: none;
      cursor: pointer;
    }
  }
}
</style>