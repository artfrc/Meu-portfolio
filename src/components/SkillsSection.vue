<script setup lang="ts">
import { useLocale } from '../composables/useLocale'
import SectionHeading from './SectionHeading.vue'
import StackList from './StackList.vue'

const { t } = useLocale()

const dotColors = ['bg-red', 'bg-purple', 'bg-blue', 'bg-green', 'bg-yellow']
</script>

<template>
  <section id="habilidades" class="bg-gray-200 py-16 md:py-24">
    <div class="mx-auto max-w-6xl px-4 md:px-6">
      <SectionHeading :eyebrow="t.skills.eyebrow" :title="t.skills.title" />

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(group, index) in t.skills.groups"
          :key="group.title"
          class="rounded-2xl border border-gray-300 bg-gray-100/60 p-5"
        >
          <h3 class="flex items-center gap-2 font-title text-lg font-bold text-gray-600">
            <span class="size-2 shrink-0 rounded-full" :class="dotColors[index % dotColors.length]" aria-hidden="true" />
            {{ group.title }}
          </h3>
          <StackList class="mt-4" :items="group.items" />
          <p v-if="group.note" class="mt-3 text-sm text-gray-400">{{ group.note }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
