<template>
  <div class="code">
    <div class="type">
      <span class="directory">
        <Icon
          v-if="filename"
          size="14px"
          :color="color.white.default"
        >
          draft
        </Icon>
        &nbsp;{{ filename }}
      </span>
      <span>
        {{ language }}
      </span>
    </div>

    <div
      class="code-block"
      :type="language"
      @mouseenter="isShowCopyButton = true"
      @mouseleave="isShowCopyButton = false"
    >
      <span :id="thisId">
        <slot />
      </span>
      <div
        v-if="isShowCopyButton"
        @click="copy()"
        class="copy-button"
      >
        <Icon size="1em">
          content_copy
        </Icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useColorStore } from '~~/store/colorStore';

/* -- type, interface -- */
interface IProps {
  code?: string
  language?: string
  filename?: string
  highlights?: Array<number>
}

/* -- props, emit -- */
const props =  withDefaults(defineProps<IProps>(), {
  code: '',
  language: null,
  filename:  null,
})

/* -- store -- */
const {
  color
} = useColorStore()

/* -- variable(ref, reactive, computed) -- */
const isShowCopyButton = ref(false)
const thisId = ref('')

/* -- function -- */
const copy = () => {
  if (navigator.clipboard) {
    console.log(thisId)
    navigator.clipboard.writeText(document.getElementById(thisId.value).textContent);
  }
}

/* -- watch -- */

/* -- life cycle -- */
onMounted(() => {
  thisId.value = 'code-' + Math.random().toString(32).substring(2)
})

</script>

<style lang="scss">
.type {
  display: flex;
  justify-content: space-between;

  padding: 1em 16px;

  color: v-bind('color.black.lighten[2]');
  font-size: 12px;
  font-weight: 600;
  border-radius: 0.5em 0.5em 0em 0em;
  background-color: v-bind('color.black.darken[1]');

  .directory {
    display: flex;
    align-content: center;
  }
}

.code {
  margin-top: 0.5em;
  margin-bottom: 1em;
}

.code-block {
  position: relative;

  &[type = "cmd"] {
    code {
      &::before {
        position: absolute;
        content: '>';
        font-weight: 600;
        color: v-bind('color.green.default');
        margin-right: 0.5rem;
      }

      .line {
        margin-left: 1.5rem;
      }
    }
  }

  .copy-button {
    position: absolute;
    width: auto;
    height: 2em;
    right: 1em;
    top: 1em;

    text-align: center;
    border-radius: 0.4em;
    background-color: v-bind('color.black.darken[1]');
    aspect-ratio: 1 / 1;
    cursor: pointer;

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      color: v-bind('color.black.lighten[1]');
    }
  }
}

pre {
  position: relative;
  height: 100%;
  padding: 1em 2em;
  margin: 0px;

  border-radius: 0em 0em 0.5em 0.5em;
  background-color: v-bind('color.black.default');
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
    background-color: v-bind('color.black.lighten[1]');
  }
}

code {
  position: relative;

  color: v-bind('color.black.lighten[2]');
  font-weight: 400;
  font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;

  .line {
    display: block;
    min-height: 1.5rem;
  }
}
</style>