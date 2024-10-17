<script setup lang="ts">
import { resister } from "@web-bottom-sheet/core";
import { onMounted, ref } from "vue";

const isLoaded = ref(false);

onMounted(() => {
  resister(["web-bottom-sheet-snap-point"]);

  customElements.whenDefined("web-bottom-sheet").then(() => {
    isLoaded.value = true;
  });
});
</script>

<template>
  <template v-if="isLoaded">
    <web-bottom-sheet-snap-point>
      <slot />
    </web-bottom-sheet-snap-point>
  </template>
  <template v-else>
    <div id="web-bottom-sheet-skeleton" />
  </template>
</template>
