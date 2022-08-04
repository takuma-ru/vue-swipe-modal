<template>
  <nav v-show="nowPath !== '/'">
    <div
      v-for="group in navLinks"
      :key="group.name"
    >
      <div class="group-name">
        <Icon size="12px" style="margin-right: 1em">{{ group.icon }}</Icon>
        <h3>{{ group.name }}</h3>
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
import { useColorStore } from '../store/color';

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
  cssColor
} = useColorStore()

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
      { name: 'index', link: '/started' },
      { name: '2.x', link: '/started/vue2' },
      { name: '3.x', link: '/started/vue3' },
      { name: 'nuxt2.x', link: '/started/nuxt2' },
    ]
  },
  {
    name: 'Docs',
    icon: 'description',
    links: [
      { name: 'index', link: '/docs' },
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
        width: 4px;
        height: 100%;
        left: 1em;

        border-radius: 2px;
        background-color: $green;
      }

      a {
        color: v-bind(cssColor('theme', 'text'));
        text-decoration: none;
        cursor: pointer;
      }
    }

    a {
      color: v-bind(cssColor('theme', 'text'));
      text-decoration: none;
      cursor: pointer;
    }
  }
}
</style>