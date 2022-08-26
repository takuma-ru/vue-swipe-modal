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
  width: calc(256px - 32px);
  padding: 0px 16px;
  margin: 32px 0px;

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