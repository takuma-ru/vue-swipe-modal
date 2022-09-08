<template>
  <div id="prop-title">
    <div
      v-for="(value, key) in props"
      :key="key"
      class="detail"
    >
      <span class="key">
        {{ key }}
      </span>
      <span class="value">
        {{ value }}
      </span>
    </div>
    <div class="description">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useColorModeStore } from '~~/store/colorModeStore';
import { useColorStore } from '../../store/colorStore'

/* -- type, interface -- */
export interface IIconProps {
  propName: string
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'tuple' | 'union' | 'literal' | string
  defaultValue: string
}

/* -- props, emit -- */
/* -- store -- */

const {
  colorMode
} = useColorModeStore()

const {
  color
} = useColorStore()

/* -- variable(ref, reactive, computed) -- */
/* -- function -- */
/* -- watch -- */
/* -- life cycle -- */

const props = withDefaults(defineProps<IIconProps>(), {
  propName: 'none',
  type : 'any',
  defaultValue: 'null',
})

</script>

<style lang="scss" scoped>
#prop-title {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;

  .key {
    position: relative;
    font-weight: bold;

    &::after {
      content: '';

      position: absolute;
      width: 2px;
      height: 100%;
      right: 2rem;

      background-color: v-bind('colorMode === "light" ? color.black.lighten[2] :  color.black.lighten[1]');
    }
  }

  .detail {
    display: grid;
    grid-template-columns: 1fr 1fr;

    margin-top: 2em;
  }

  .description {
    margin-top: 3em;
  }
}
</style>
