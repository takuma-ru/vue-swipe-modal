<template>
  <span class="material-symbols-rounded">
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { useColorStore } from '../../store/colorStore'

/* -- type, interface -- */
export interface IIconProps {
  size?: string
  color?: string
  fill?: boolean
  wght?: number
  grad?: number
  opsz?: number

}
/* -- props, emit -- */
/* -- store -- */
const {
  color
} = useColorStore()

/* -- variable(ref, reactive, computed) -- */
/* -- function -- */
/* -- watch -- */
/* -- life cycle -- */

const props = withDefaults(defineProps<IIconProps>(), {
  size: '24px',
  color: null,
  fill: false,
  wght: 400,
  grad: 0,
  opsz: 48
})

</script>

<style lang="scss" scoped>
.material-symbols-rounded {
  font-variation-settings: 'FILL' v-bind('props.fill ? 1 : 0'), 'wght' v-bind('props.wght'), 'GRAD' v-bind('props.grad'), 'opsz' v-bind('props.opsz');
  font-size: v-bind('props.size');
  color: v-bind('props.color ? props.color : color.theme.text');
  text-align: center;
  user-select: none;
}
</style>
