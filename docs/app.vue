<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style lang="scss">
html {
  background-color: $white-darken-1;
  font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;
}

body {
  margin: 0px;
  color: $black;
}

h1, h2, h3, h4, p {
  margin: 0px;
}

h1 {
  position: relative;
  padding-bottom: 0.25em;
  margin-bottom: 0.5em;

  &::before {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    bottom: 0px;

    background-color: $black-lighten-2;
  }
}
</style>