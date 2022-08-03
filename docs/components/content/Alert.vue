<script lang="ts" setup>
import { PropType } from 'vue'

defineProps({
  type: {
    type: String as PropType<'warn' | 'err' | 'suc'>,
    default: 'warn'
  }
})
</script>

<template>
  <div :class="`alert-${type}`">
    <Icon
      style="margin-right: 0.5em"
    >
      {{ type === 'warn' ? 'warning' : type === 'err' ? 'error' : 'info' }}
    </Icon>
    <Markdown unwrap="p" />
  </div>
</template>

<style lang="scss" scoped>
.alert {
  & {
    display: flex;
    align-items: center;

    width: auto;
    padding: 1em;
    border-radius: 0.4em;
  }

  $element: #{&};

  &-warn {
    @extend #{$element};
    background-color: $yellow-lighten-1;

    @media (prefers-color-scheme: dark) {
      background-color: $yellow-darken-2;
    }
  }
}


</style>