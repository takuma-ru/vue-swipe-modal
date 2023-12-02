import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vue-swipe-modal",
  description: "Swipeable Bottom Sheet library for vue2 and vue3",
  head: [
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "https://user-images.githubusercontent.com/49429291/182005504-0567f54a-80e3-4a31-ba5b-740db91b5190.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "https://user-images.githubusercontent.com/49429291/182005504-0567f54a-80e3-4a31-ba5b-740db91b5190.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "https://user-images.githubusercontent.com/49429291/182005504-0567f54a-80e3-4a31-ba5b-740db91b5190.png",
      },
    ],
    [
      "link",
      {
        rel: "mask-icon",
        href: "https://user-images.githubusercontent.com/49429291/182005504-0567f54a-80e3-4a31-ba5b-740db91b5190.png",
        color: "#3a0839",
      },
    ],
    [
      "link",
      {
        rel: "shortcut icon",
        href: "https://user-images.githubusercontent.com/49429291/182005504-0567f54a-80e3-4a31-ba5b-740db91b5190.png",
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "https://user-images.githubusercontent.com/49429291/182005504-0567f54a-80e3-4a31-ba5b-740db91b5190.png",

    nav: [
      { text: "Home", link: "/" },
      { text: "Documents", link: "/documents/properties.md" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present takuma-ru",
    },

    sidebar: [
      {
        text: "Introduction",
        items: [
          {
            text: "Getting Started",
            link: "/getting-started",
          },
          {
            text: "Playground",
            link: "/playground",
          },
        ],
      },
      /* {
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
      }, */
      {
        text: "Documents",
        items: [
          {
            text: "Properties",
            link: "/documents/properties",
          },
          {
            text: "Custom style",
            link: "/documents/custom-style",
          },
        ],
      },
      /* {
        text: "Roadmap",
        link: "/roadmap",
      }, */
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/takuma-ru/vue-swipe-modal" },
    ],
  },
});
