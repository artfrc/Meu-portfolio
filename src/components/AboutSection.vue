<script setup lang="ts">
import { useLocale } from '../composables/useLocale'
import SectionHeading from './SectionHeading.vue'

const { t } = useLocale()

const metricColors = ['text-red', 'text-purple', 'text-blue', 'text-green', 'text-yellow']
</script>

<template>
  <section id="sobre" class="bg-gray-200 py-16 md:py-24">
    <div class="mx-auto max-w-6xl px-4 md:px-6">
      <SectionHeading :eyebrow="t.about.eyebrow" :title="t.about.title" />

      <div class="grid gap-10 lg:grid-cols-5 lg:items-start">
        <div class="space-y-4 leading-relaxed lg:col-span-3">
          <p v-for="paragraph in t.about.summary" :key="paragraph">{{ paragraph }}</p>
        </div>

        <dl class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-2">
          <div
            v-for="(metric, index) in t.about.metrics"
            :key="metric.label"
            class="flex flex-col-reverse rounded-xl border border-gray-300 bg-gray-100/60 p-4"
          >
            <dt class="mt-1 text-xs leading-snug text-gray-400 md:text-sm">{{ metric.label }}</dt>
            <dd class="font-title text-2xl font-bold md:text-3xl" :class="metricColors[index % metricColors.length]">
              {{ metric.value }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
