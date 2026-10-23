<script setup lang="ts">
import { useLocale } from '../composables/useLocale'
import RichText from './RichText.vue'
import SectionHeading from './SectionHeading.vue'
import StackList from './StackList.vue'

const { t } = useLocale()
</script>

<template>
  <section id="experiencia" class="bg-gray-100 py-16 md:py-24">
    <div class="mx-auto max-w-4xl px-4 md:px-6">
      <SectionHeading :eyebrow="t.experience.eyebrow" :title="t.experience.title" />

      <ol class="space-y-12 border-l border-gray-300 pl-6 md:pl-10">
        <li v-for="role in t.experience.roles" :key="role.title" class="relative">
          <span
            class="absolute top-2 -left-[calc(1.5rem+5.5px)] size-2.5 rounded-full ring-4 ring-gray-100 md:-left-[calc(2.5rem+5.5px)]"
            :class="role.current ? 'bg-red' : 'bg-gray-400'"
            aria-hidden="true"
          />

          <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 class="font-title text-xl font-bold text-gray-600 md:text-2xl">{{ role.title }}</h3>
            <p class="font-mono text-sm text-gray-400">{{ role.period }}</p>
          </div>
          <p class="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-400">
            <span class="font-semibold text-red">{{ role.company }}</span>
            <span aria-hidden="true">·</span>
            <span>{{ role.location }}</span>
            <span v-if="role.current" class="rounded-full bg-green/15 px-2 py-0.5 text-xs text-green">
              {{ t.experience.currentBadge }}
            </span>
          </p>

          <ul class="mt-4 space-y-2.5">
            <li v-for="item in role.highlights" :key="item" class="relative pl-5 text-sm leading-relaxed md:text-base">
              <span class="absolute top-[0.6em] left-0 size-1.5 rounded-full bg-gray-400" aria-hidden="true" />
              <RichText :text="item" />
            </li>
          </ul>

          <StackList class="mt-5" :items="role.stack" />
        </li>
      </ol>
    </div>
  </section>
</template>
