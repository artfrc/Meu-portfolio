<script setup lang="ts">
import { watchEffect } from 'vue'
import AboutSection from './components/AboutSection.vue'
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import ContactSection from './components/ContactSection.vue'
import EducationSection from './components/EducationSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import HeroSection from './components/HeroSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import { useLocale } from './composables/useLocale'

const { t } = useLocale()

// Mantém <html lang>, título e descrição coerentes com o idioma escolhido.
watchEffect(() => {
  document.documentElement.lang = t.value.meta.htmlLang
  document.title = t.value.meta.title
  document.querySelector('meta[name="description"]')?.setAttribute('content', t.value.meta.description)
})
</script>

<template>
  <a
    href="#conteudo"
    class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:rounded-md focus:bg-gray-600 focus:px-4 focus:py-2 focus:text-gray-100"
  >
    {{ t.nav.skipToContent }}
  </a>
  <AppHeader />
  <main id="conteudo">
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
    <EducationSection />
    <SkillsSection />
    <ContactSection />
  </main>
  <AppFooter />
</template>
