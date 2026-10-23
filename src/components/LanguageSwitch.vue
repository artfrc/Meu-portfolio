<script setup lang="ts">
import { useLocale } from '../composables/useLocale'
import type { Locale } from '../content/types'

const { t, locale, setLocale } = useLocale()

const options: { value: Locale; label: string; name: string; lang: string }[] = [
  { value: 'pt', label: 'PT', name: 'Português', lang: 'pt-BR' },
  { value: 'en', label: 'EN', name: 'English', lang: 'en' },
]
</script>

<template>
  <div role="group" :aria-label="t.nav.languageLabel" class="flex rounded-full border border-gray-300 p-0.5 font-mono text-xs">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      :lang="option.lang"
      :title="option.name"
      :aria-label="option.name"
      :aria-pressed="locale === option.value"
      class="cursor-pointer rounded-full px-2.5 py-1 transition-colors"
      :class="locale === option.value ? 'bg-gray-300 text-gray-600' : 'text-gray-400 hover:text-gray-500'"
      @click="setLocale(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
