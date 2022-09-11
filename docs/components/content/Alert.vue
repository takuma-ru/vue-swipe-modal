<template>
  <div :class="`alert-${type}`">
    <Icon
      style="margin-right: 0.5em"
      size="28px"
      :color="color.black.default"
    >
      {{ type === 'warn' ? 'warning' : type === 'err' ? 'error' : 'info' }}
    </Icon>
    <ContentSlot
      :use="$slots.default"
      unwrap="p"
    />
  </div>
</template>

<script lang="ts" setup>
import { useColorStore } from '../../store/colorStore'
import { PropType } from 'vue'
import { useColorModeStore } from '~~/store/colorModeStore';

defineProps({
  type: {
    type: String as PropType<'warn' | 'err' | 'suc'>,
    default: 'warn'
  }
})

const {
  colorMode
} = useColorModeStore()

const {
  color
} = useColorStore()
</script>

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
    background-color: v-bind('color.yellow.default');
    color: v-bind('color.black.default');
  }
}


</style>