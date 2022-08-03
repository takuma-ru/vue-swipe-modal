<template>
  <!-- 一行で表さないと表示が崩れる -->
  <div class="code-block">
    <div class="type">
      <span class="directory">
        <Icon
          v-if="directory"
          size="14px"
        >
          draft
        </Icon>
        &nbsp;{{ directory }}
      </span>
      <span>
        {{ type }}
      </span>
    </div>
    <pre @mouseenter="isShowCopyButton = true" @mouseleave="isShowCopyButton = false"><code id="slot" :type="type"><Markdown unwrap="p" /></code><div v-if="isShowCopyButton" @click="copy()" class="copy-button"><Icon size="1em">content_copy</Icon></div></pre>
  </div>
</template>

<script lang="ts" setup>
import { ref, useSlots } from 'vue';

const slot = useSlots()

defineProps({
  type: {
    type: String,
    default: 'md'
  },
  directory: {
    type: String,
    default: null
  },
})

const isShowCopyButton = ref(false)

const copy = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(document.getElementById('slot').textContent);
  }
}

</script>

<style lang="scss">
.code-block {
  margin: 16px 0px;

  .type {
    display: flex;
    justify-content: space-between;

    padding: 0.8em 16px;

    color: $black-lighten-2;
    font-size: 12px;
    font-weight: 600;
    border-radius: 0.5em 0.5em 0em 0em;
    /* border: 2px solid $black-darken-1; */
    background-color: $black-lighten-1;

    .directory {
      display: flex;
      align-content: center;
    }
  }

  pre {
    position: relative;
    height: 100%;
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

    .copy-button {
      position: absolute;
      width: auto;
      height: 2em;
      right: 1em;
      top: 0.8em;

      text-align: center;
      border-radius: 0.4em;
      background-color: $black-darken-1;
      aspect-ratio: 1 / 1;
      cursor: pointer;

      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        color: $black-lighten-1;
      }
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