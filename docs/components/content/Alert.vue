<script setup>
defineProps(['type'])
</script>

<template>
  <div :class="[type]">
    <Markdown unwrap="p" />
  </div>
</template>