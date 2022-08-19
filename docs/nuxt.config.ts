import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  meta: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,500,0,0',
      },
    ],
  },

  loadingIndicator: {
    name: './assets/loadingIndicator.html',
  },

  modules: [ '@nuxt/content' ],
})
