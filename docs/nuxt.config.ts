import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  meta: {
    link: [
      { rel: 'icon', type: 'image/png', href: '/icon_transparent.png' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
      },
    ],
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
