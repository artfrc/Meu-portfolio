<script setup lang="ts">
import { computed } from 'vue'

// Renderiza **trechos** em negrito sem usar v-html.
const props = defineProps<{ text: string }>()

const parts = computed(() =>
  props.text.split(/\*\*(.+?)\*\*/g).map((value, index) => ({ value, strong: index % 2 === 1 })),
)
</script>

<template>
  <template v-for="(part, index) in parts" :key="index">
    <strong v-if="part.strong" class="font-semibold text-gray-600">{{ part.value }}</strong>
    <template v-else>{{ part.value }}</template>
  </template>
</template>
