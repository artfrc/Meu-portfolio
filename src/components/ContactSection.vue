<script setup lang="ts">
import { computed } from 'vue'
import contactBackground from '../assets/backgrounds/contact.png'
import { useLocale } from '../composables/useLocale'
import { contactEmail, links, whatsAppUrl } from '../content/shared'
import AppIcon, { type IconName } from './AppIcon.vue'
import SectionHeading from './SectionHeading.vue'

const { t } = useLocale()

const channels = computed(() => {
  const labels = t.value.contact.channels
  const email = contactEmail()
  const list: { icon: IconName; label: string; href: string; detail?: string; external: boolean }[] = [
    { icon: 'linkedin', label: labels.linkedin, href: links.linkedin, detail: 'in/fernandes-arthur', external: true },
    { icon: 'github', label: labels.github, href: links.github, detail: 'github.com/artfrc', external: true },
    { icon: 'whatsapp', label: labels.whatsapp, href: whatsAppUrl(), external: true },
    { icon: 'mail', label: labels.email, href: `mailto:${email}`, detail: email, external: false },
  ]
  return list
})
</script>

<template>
  <section
    id="contato"
    class="bg-gray-100 bg-cover bg-center py-16 md:py-24"
    :style="{ backgroundImage: `url(${contactBackground})` }"
  >
    <div class="mx-auto max-w-5xl px-4 md:px-6">
      <SectionHeading :eyebrow="t.contact.eyebrow" :title="t.contact.title" accent="purple" />
      <p class="-mt-6 mb-10 text-center md:-mt-10 md:mb-12">{{ t.contact.subtitle }}</p>

      <ul class="mx-auto max-w-md space-y-3">
        <li v-for="channel in channels" :key="channel.icon">
          <a
            :href="channel.href"
            :target="channel.external ? '_blank' : undefined"
            :rel="channel.external ? 'noopener noreferrer' : undefined"
            class="group flex min-h-18 items-center gap-4 rounded-xl border border-transparent bg-gray-300 px-5 py-3 transition-colors hover:border-blue"
          >
            <AppIcon :name="channel.icon" class="size-6 shrink-0 text-gray-500 group-hover:text-blue" />
            <span class="flex min-w-0 flex-col">
              <span class="text-gray-500 group-hover:text-blue">{{ channel.label }}</span>
              <span v-if="channel.detail" class="truncate text-xs text-gray-400">{{ channel.detail }}</span>
            </span>
            <AppIcon name="arrow-up-right" class="ml-auto size-4 shrink-0 text-gray-400 group-hover:text-blue" />
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
