<script setup lang="ts">
defineProps<{ items: readonly string[] }>()
</script>

<template>
  <ul class="flex flex-wrap gap-2">
    <li
      v-for="item in items"
      :key="item"
      class="rounded-md border border-gray-300 bg-gray-100/60 px-2.5 py-1 font-mono text-xs text-gray-500"
    >
      {{ item }}
    </li>
  </ul>
</template>
