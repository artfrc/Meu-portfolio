<script setup lang="ts">
import { useLocale } from '../composables/useLocale'
import SectionHeading from './SectionHeading.vue'

const { t } = useLocale()
</script>

<template>
  <section id="formacao" class="bg-gray-100 py-16 md:py-24">
    <div class="mx-auto max-w-6xl px-4 md:px-6">
      <SectionHeading :eyebrow="t.education.eyebrow" :title="t.education.title" />

      <div class="grid gap-6 md:grid-cols-2">
        <article class="rounded-2xl border border-gray-300 bg-gray-200 p-6 md:col-span-2 md:p-8">
          <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 class="font-title text-xl font-bold text-gray-600 md:text-2xl">{{ t.education.degree.title }}</h3>
            <p class="font-mono text-sm text-gray-400">{{ t.education.degree.expected }}</p>
          </div>
          <p class="mt-1 font-semibold text-red">{{ t.education.degree.institution }}</p>
          <ul class="mt-4 space-y-2">
            <li v-for="note in t.education.degree.notes" :key="note" class="relative pl-5 text-sm">
              <span class="absolute top-[0.6em] left-0 size-1.5 rounded-full bg-gray-400" aria-hidden="true" />
              {{ note }}
            </li>
          </ul>
        </article>

        <article class="rounded-2xl border border-gray-300 bg-gray-200 p-6">
          <h3 class="font-title text-lg font-bold text-gray-600">{{ t.education.courses.title }}</h3>
          <div class="mt-4 space-y-4">
            <div v-for="provider in t.education.courses.providers" :key="provider.name">
              <p class="font-mono text-sm text-purple">{{ provider.name }}</p>
              <ul class="mt-2 space-y-1.5">
                <li v-for="course in provider.items" :key="course" class="text-sm">{{ course }}</li>
              </ul>
            </div>
          </div>
        </article>

        <div class="grid gap-6">
          <article class="rounded-2xl border border-gray-300 bg-gray-200 p-6">
            <h3 class="font-title text-lg font-bold text-gray-600">{{ t.education.competitions.title }}</h3>
            <p class="mt-3 text-sm leading-relaxed">{{ t.education.competitions.text }}</p>
          </article>

          <article class="rounded-2xl border border-gray-300 bg-gray-200 p-6">
            <h3 class="font-title text-lg font-bold text-gray-600">{{ t.education.languages.title }}</h3>
            <ul class="mt-3 space-y-2">
              <li v-for="language in t.education.languages.items" :key="language.name" class="text-sm">
                <span class="font-semibold text-gray-600">{{ language.name }}:</span> {{ language.level }}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
