import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vue-swipe-modal",
  description: "Swipeable Bottom Sheet library for vue2 and vue3",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "https://user-images.githubusercontent.com/49429291/182005504-0567f54a-80e3-4a31-ba5b-740db91b5190.png",

    nav: [
      { text: "Home", link: "/" },
      { text: "Documents", link: "/" },
    ],

    sidebar: [
      {
        items: [
          {
            text: "Getting Started",
            link: "/getting-started",
          },
        ],
      },
      {
        text: "Tutorial",
        items: [
          {
            text: "Basic Usage",
            link: "/tutorial/basic-usage",
          },
          {
            text: "Advanced Usage",
            link: "/tutorial/advanced-usage",
          },
        ],
      },
      {
        text: "Documents",
        items: [
          {
            text: "Properties",
            link: "/documents/properties",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/takuma-ru/vue-swipe-modal" },
    ],
  },
});
