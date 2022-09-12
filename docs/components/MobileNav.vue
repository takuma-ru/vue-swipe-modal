<template>
  <div
    id="mobile-nav"
    v-if="nowPath !== '/' && isMobile()"
  >
    <Btn
      is-icon
      icon="menu"
      @click="isOpen = true"
    />
    <transition name="transition-nav">
      <nav v-show="isOpen">
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
                @click="isOpen = false"
              >
                {{ link.name }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </nav>
    </transition>
    <div
      v-show="isOpen"
      class="nav-background"
      @click="isOpen = false"
    />
  </div>
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

const isOpen = ref(false)

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
      { name: 'background-color', link: '/props/backgroundcolor' },
      { name: 'border-top-left-radius', link: '/props/bordertopleftradius' },
      { name: 'border-top-radius', link: '/props/bordertopradius' },
      { name: 'border-top-right-radius', link: '/props/bordertoprightradius' },
      { name: 'contents-color', link: '/props/contentscolor' },
      { name: 'contents-height', link: '/props/contentsheight' },
      { name: 'contents-width', link: '/props/contentswidth' },
      { name: 'dark-contents-color', link: '/props/darkcontentscolor' },
      { name: 'dark', link: '/props/dark' },
      { name: 'fullscreen', link: '/props/fullscreen' },
      { name: 'no-tip', link: '/props/notip' },
      { name: 'persistent', link: '/props/persistent' },
      { name: 'tip-color', link: '/props/tipcolor' },
      { name: 'v-modal', link: '/props/vmodal' },
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
#mobile-nav {

  .nav-background {
    position: fixed;
    width: 100vw;
    height: 100vh;

    top: 0px;
    left: 0px;

    background-color: #00000080;
    z-index: 98;
  }

  nav {
    position: fixed;
    width: 256px - 32px;
    height: 100vh;
    padding: 32px 16px;

    top: 0px;
    left: 0px;

    background-color: v-bind('color.theme.background');
    overflow: auto;
    z-index: 99;

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
          width: 4px;
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

  .transition-nav {
    &-enter {
      &-from {
        left: -256px;
      }
      &-active {
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      }
      &-to {
        left: 0px;
      }
    }

    &-leave {
      &-from {
        left: 0px;
      }
      &-active {
        transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
      }
      &-to {
        left: -256px;
      }
    }
  }
}
</style>