<template>
  <main>
    <ContentDoc class="main" />
  </main>
</template>

<style lang="scss">
main {
  position: relative;
  max-width: 100%;
  padding-bottom: 32px;
  margin: 0px 16px;
  margin-top: 32px;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background: $black-lighten-1;
    border-radius: 4px;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-track {
    margin-top: 4px;
    margin-bottom: 4px;
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

      @media (prefers-color-scheme: dark) {
        background-color: $black-darken-1;
      }
    }
  }

  h2, h3, h4 {
    position: relative;
    padding: 0.25em 0px;
    margin: 0.5em 0px;

    &:hover {
      &::before {
        content: '#';
        position: absolute;
        left: -1em;
        @media (prefers-color-scheme: dark) {
          color: $black-lighten-1;
        }
      }
    }

    a {
      color: $black;
      text-decoration: none;

      @media (prefers-color-scheme: dark) {
        color: $white;
      }
    }
  }

  p {
    padding-bottom: 0.5em;
  }

  ul {
    margin: 0.5em 0px;
  }

  code {
    position: relative;

    color: $black-lighten-2;
    font-weight: 400;
    font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;
    overflow: auto;
  }
}
</style>