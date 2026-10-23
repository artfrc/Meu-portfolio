<script setup lang="ts">
type Accent = 'red' | 'purple'

withDefaults(defineProps<{ eyebrow: string; title: string; accent?: Accent }>(), { accent: 'red' })

const accentClass: Record<Accent, string> = {
  red: 'text-red',
  purple: 'text-purple',
}
</script>

<template>
  <header class="mb-10 text-center md:mb-14">
    <p class="font-mono text-base md:text-xl" :class="accentClass[accent]">{{ eyebrow }}</p>
    <h2 class="mt-2 font-title text-2xl font-bold text-gray-600 md:text-4xl">{{ title }}</h2>
  </header>
</template>
