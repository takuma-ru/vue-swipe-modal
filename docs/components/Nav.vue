<template>
  <nav>
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
        <div class="link">
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
import { ref } from 'vue';

type NavLinksType = Array<{
  name: string
  icon: string
  links: Array<{
    name: string,
    link: string
  }>
}>

const navLinks = ref<NavLinksType>([
  {
    name: 'Get started',
    icon: 'start',
    links: [
      { name: 'vue2.x', link: '/started/vue2' },
      { name: 'vue3.x', link: '/started/vue3' },
      { name: 'nuxt2.x', link: '/started/nuxt2' },
    ]
  },
  {
    name: 'Docs',
    icon: 'description',
    links: [
      { name: 'Index', link: '/docs' },
    ]
  },
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

    a {
      color: $black-darken-2;
      cursor: pointer;
      text-decoration: none;

      @media (prefers-color-scheme: dark) {
        color: $white-darken-2;
      }
    }
  }
}
</style>