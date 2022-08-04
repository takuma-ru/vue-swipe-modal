<template>
  <button
    id="Button"
    :disabled="disabled"
    :style="{
      backgroundColor: ''
    }"
    :size="size"
    :fab="fab"
    :icon="iconMode"
    @click=""
  >
    <div
      class="text"
      :style="`
        --color: ${textColor}
      `"
    >
      <Icon
        v-if="icon"
        text
        size="24px"
        :icon="icon"
      />
      <Markdown unwrap="p" />
    </div>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: 'primary',
  },
  textColor: {
    type: String,
    default: 'black',
  },
  size: {
    type: String,
    default: 'normal',
    validator: (value: string) => {
      return ['small', 'normal', 'large'].includes(value)
    },
  },
  fab: {
    type: Boolean,
    default: false,
  },
  iconMode: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    default: null,
  },
})


</script>

<style lang="scss" scoped>
button {
  position: relative;
  width: auto;
  height: 100%;

  border: none;
  border-radius: 0.4em;
  background-color: $green;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color:rgba(0,0,0,0);

  .text {
    --color: $white;
    display: inline-flex;
    position: relative;
    z-index: 1;
    margin: 0rem 1rem;

    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: var(--color);

    justify-content: center;
    align-items: center;
    vertical-align: middle;

    svg {
      path {
        fill: var(--color);
      }
    }
  }

  &:hover::before {
    position: absolute;
    z-index: 2;
    content: '';
    width: 100%;
    height: 100%;

    top: 0%;
    left: 0%;

    border-radius: 8px;
    background-color: #CCCCCC2D;
  }

  &:disabled {
    color: rgba(16, 16, 16, 0.5);
    cursor: not-allowed;

    .text {
      color: rgba(16, 16, 16, 0.5);
    }

    svg path {
      fill: rgba(16, 16, 16, 0.5);
    }

    &::after {
      position: absolute;
      z-index: 0;
      content: '';
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;

      border-radius: 8px;
      background-color: $black-lighten-2;
    }
  }

  &:disabled:hover::before {
    position: absolute;
    z-index: 1;
    content: '';
    width: 100%;
    height: 100%;

    top: 0%;
    left: 0%;

    border-radius: 8px;
    background-color: #CCCCCC00;
  }

  &[fab] {
    .text {
      height: calc(100% - 16px);
      padding: 8px;
    }
  }

  &[icon] {
    .text {
      height: calc(100% - 16px);
      padding: 0px;
    }
  }

  &[size = "small"] {
    width: auto;
    height: 24px;
  }

  &[size = "normal"] {
    width: auto;
    height: 36px;
  }

  &[size = "large"] {
    width: auto;
    height: 64px;
    border-radius: 16px;

    &:hover::before {
      border-radius: 16px;
    }
  }
}
</style>
