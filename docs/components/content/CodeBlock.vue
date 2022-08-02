<template>
  <!-- 一行で表さないと表示が崩れる -->
  <div class="code-block">
    <div class="type">
      {{ type }}
    </div>
    <pre><code :type="type"><Markdown unwrap="p" /></code></pre>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  type: {
    type: String,
    default: 'md'
  },
})
</script>

<style lang="scss">
.code-block {
  margin: 8px 0px;

  .type {
    padding: 0.4em 16px;

    color: $black-lighten-2;
    font-size: 14px;
    font-weight: 600;
    border-radius: 0.5em 0.5em 0em 0em;
    /* border: 2px solid $black-darken-1; */
    background-color: $black-lighten-1;
  }

  pre {
    height: auto;
    padding: 1em;
    margin: 0px;

    border-radius: 0em 0em 0.5em 0.5em;
    background-color: $black;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
      margin: 1em;
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $black-lighten-1;
    }
  }

  code {
    position: relative;

    color: $black-lighten-2;
    font-weight: 400;
    font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;
    overflow: auto;

    &[type = "cmd"] {
      &::before {
        content: '>';
        font-weight: 600;
        color: $green;
        margin-right: 0.8em;
      }
    }
  }
}
</style>