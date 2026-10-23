<script setup lang="ts">
import introBackground from '../assets/backgrounds/intro.png'
import codeBadge from '../assets/images/code-badge.png'
import photo from '../assets/images/me.webp'
import { useLocale } from '../composables/useLocale'
import { cvUrl, heroStack } from '../content/shared'
import AppIcon from './AppIcon.vue'

const { t, locale } = useLocale()
</script>

<template>
  <section
    id="inicio"
    class="bg-gray-100 bg-cover bg-center pt-28 pb-12 md:pt-36 md:pb-16"
    :style="{ backgroundImage: `url(${introBackground})` }"
  >
    <div class="mx-auto flex max-w-6xl flex-col items-center px-4 text-center">
      <div class="relative">
        <img
          :src="photo"
          :alt="t.hero.photoAlt"
          width="112"
          height="112"
          class="size-24 rounded-full border-2 border-red object-cover md:size-28"
        />
        <img
          :src="codeBadge"
          alt=""
          class="absolute right-0 bottom-0 w-7 transition-transform duration-200 hover:scale-110 md:w-8"
        />
      </div>

      <p class="mt-5 font-mono text-sm text-gray-500 sm:text-base md:text-xl">
        {{ t.hero.greeting.before }} <span class="text-red">Arthur Fernandes</span> {{ t.hero.greeting.after }}
      </p>
      <h1 class="mt-3 font-title text-3xl leading-tight font-bold text-gray-600 sm:text-4xl md:text-6xl">
        {{ t.hero.roleTitle }}
        <span class="block bg-linear-to-r from-red via-purple to-blue bg-clip-text text-transparent">
          {{ t.hero.roleStack }}
        </span>
      </h1>
      <p class="mt-5 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">{{ t.hero.tagline }}</p>
      <p
        class="mt-4 inline-flex items-center gap-2 rounded-full border border-green/30 bg-green/10 px-3 py-1 text-xs text-green md:text-sm"
      >
        <AppIcon name="map-pin" class="size-4" />
        {{ t.hero.availability }}
      </p>

      <div class="mt-7 flex flex-wrap justify-center gap-3">
        <a
          href="#contato"
          class="rounded-full bg-red px-6 py-3 text-sm font-semibold text-gray-100 transition-colors hover:bg-red/85"
        >
          {{ t.hero.ctaContact }}
        </a>
        <a
          :href="cvUrl(locale)"
          download
          class="inline-flex items-center gap-2 rounded-full border border-gray-400/60 px-6 py-3 text-sm font-semibold text-gray-600 transition-colors hover:border-gray-500 hover:bg-white/5"
        >
          <AppIcon name="download" class="size-4" />
          {{ t.hero.ctaCv }}
        </a>
      </div>

      <ul class="mt-10 flex flex-wrap justify-center gap-3 md:gap-4">
        <li
          v-for="tech in heroStack"
          :key="tech.name"
          class="flex h-9 items-center gap-2 rounded-full border border-white/60 bg-[#333] px-4 motion-safe:animate-shine md:h-10"
        >
          <img :src="tech.icon" alt="" class="size-5" />
          <span class="text-sm text-gray-500">{{ tech.name }}</span>
        </li>
      </ul>

      <a
        href="#sobre"
        class="mt-12 text-gray-400 transition-colors hover:text-gray-500 motion-safe:animate-bounce"
        :aria-label="t.hero.scrollHint"
      >
        <AppIcon name="chevrons-down" class="size-7" />
      </a>
    </div>
  </section>
</template>
