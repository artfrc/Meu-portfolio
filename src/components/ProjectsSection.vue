<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale'
import AppIcon from './AppIcon.vue'
import SectionHeading from './SectionHeading.vue'
import StackList from './StackList.vue'

const { t } = useLocale()
const featured = computed(() => t.value.projects.featured)
</script>

<template>
  <section id="projetos" class="bg-gray-200 py-16 md:py-24">
    <div class="mx-auto max-w-6xl px-4 md:px-6">
      <SectionHeading :eyebrow="t.projects.eyebrow" :title="t.projects.title" />

      <article class="overflow-hidden rounded-2xl border border-gray-300 bg-gray-100/60 lg:grid lg:grid-cols-5">
        <div
          class="flex flex-col items-center justify-center gap-6 bg-[radial-gradient(circle_at_center,rgb(57_150_219/0.22),transparent_65%)] px-6 py-10 lg:col-span-2"
        >
          <img :src="featured.icon" alt="" width="160" height="160" class="size-32 md:size-40" />
          <ul class="flex flex-wrap justify-center gap-2">
            <li
              v-for="badge in featured.badges"
              :key="badge"
              class="rounded-full border border-blue/30 bg-blue/10 px-3 py-1 text-xs font-semibold text-blue"
            >
              {{ badge }}
            </li>
          </ul>
        </div>

        <div class="p-6 md:p-8 lg:col-span-3">
          <p class="font-mono text-sm text-gray-400">{{ featured.period }}</p>
          <h3 class="mt-1 font-title text-2xl font-bold text-gray-600 md:text-3xl">{{ featured.name }}</h3>
          <p class="mt-1 text-gray-500">{{ featured.tagline }}</p>
          <p class="mt-1 text-sm text-red">{{ featured.context }}</p>

          <ul class="mt-5 space-y-2.5">
            <li v-for="item in featured.highlights" :key="item" class="relative pl-5 text-sm leading-relaxed">
              <span class="absolute top-[0.6em] left-0 size-1.5 rounded-full bg-blue" aria-hidden="true" />
              {{ item }}
            </li>
          </ul>

          <StackList class="mt-5" :items="featured.stack" />

          <p class="mt-5 inline-flex items-center gap-2 text-sm text-gray-400">
            <AppIcon name="lock" class="size-4" />
            {{ t.projects.privateSource }}
          </p>
        </div>
      </article>

      <div class="mt-8 space-y-8">
        <article
          v-for="project in t.projects.others"
          :key="project.repoUrl"
          class="overflow-hidden rounded-2xl border border-gray-300 bg-gray-100/60 lg:grid lg:grid-cols-2 lg:items-center"
        >
          <div class="p-4 md:p-6 lg:order-2">
            <img
              :src="project.image"
              :alt="project.imageAlt"
              loading="lazy"
              class="aspect-2/1 w-full rounded-lg border border-gray-300 object-cover object-top"
            />
          </div>

          <div class="flex flex-col p-6 md:p-8 lg:order-1">
            <h3 class="font-title text-xl font-bold text-gray-600">{{ project.name }}</h3>
            <p class="mt-1 text-sm text-red">{{ project.tagline }}</p>

            <div class="mt-4 space-y-3 text-sm leading-relaxed">
              <p v-for="paragraph in project.description" :key="paragraph">{{ paragraph }}</p>
            </div>

            <StackList class="mt-5" :items="project.stack" />

            <a
              :href="project.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex w-fit items-center gap-2 pt-6 text-sm font-semibold text-blue hover:underline"
            >
              <AppIcon name="github" class="size-4" />
              {{ t.projects.viewSource }}
              <span class="sr-only">— {{ project.name }}</span>
              <AppIcon name="arrow-up-right" class="size-4" />
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
