import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: '@takuma-ru/vue-swipe-modal',
      link: [
        { rel: 'icon', type: 'image/png', href: '/icon_transparent.png' },
      ],
    },
  },


  loadingIndicator: {
    name: './assets/loadingIndicator.html',
  },

  modules: [ '@nuxt/content' ],

  content: {
    highlight: {
      theme: 'dark-plus',
      preload: ['html', 'css', 'ts', 'js', 'vue','r', 'cmd']
    }
  },
})
