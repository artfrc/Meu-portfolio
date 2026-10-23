<script setup lang="ts">
import { useLocale } from '../composables/useLocale'
import { links } from '../content/shared'
import AppIcon from './AppIcon.vue'

const { t } = useLocale()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-white/5 bg-gray-100 py-8">
    <div
      class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-center text-sm text-gray-400 md:flex-row md:px-6"
    >
      <p>© {{ year }} Arthur Fernandes · {{ t.footer.builtWith }}</p>
      <a
        :href="links.portfolioRepo"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 hover:text-gray-500"
      >
        <AppIcon name="github" class="size-4" />
        {{ t.footer.source }}
      </a>
    </div>
  </footer>
</template>
