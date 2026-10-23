<script setup lang="ts">
import { ref } from 'vue'
import { useActiveSection } from '../composables/useActiveSection'
import { useLocale } from '../composables/useLocale'
import { cvUrl } from '../content/shared'
import type { SectionId } from '../content/types'
import AppIcon from './AppIcon.vue'
import LanguageSwitch from './LanguageSwitch.vue'

const SECTIONS: SectionId[] = ['sobre', 'experiencia', 'projetos', 'formacao', 'habilidades', 'contato']

const { t, locale } = useLocale()
const active = useActiveSection(['inicio', ...SECTIONS])
const menuOpen = ref(false)

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-gray-100/85 backdrop-blur" @keydown.esc="closeMenu">
    <nav class="mx-auto max-w-6xl px-4 md:px-6">
      <div class="flex h-16 items-center justify-between gap-4">
        <a href="#inicio" class="font-mono text-lg text-gray-600" @click="closeMenu">
          <span class="text-red">&lt;</span>Arthur<span class="text-red"> /&gt;</span>
        </a>

        <ul class="hidden items-center gap-1 lg:flex">
          <li v-for="id in SECTIONS" :key="id">
            <a
              :href="`#${id}`"
              class="rounded-md px-3 py-2 text-sm transition-colors"
              :class="active === id ? 'text-gray-600' : 'text-gray-400 hover:text-gray-500'"
              :aria-current="active === id ? 'location' : undefined"
            >
              {{ t.nav.sections[id] }}
            </a>
          </li>
        </ul>

        <div class="flex items-center gap-2">
          <LanguageSwitch />
          <a
            :href="cvUrl(locale)"
            download
            class="hidden items-center gap-2 rounded-full bg-red px-4 py-2 text-sm font-semibold text-gray-100 transition-colors hover:bg-red/85 sm:inline-flex"
          >
            <AppIcon name="download" class="size-4" />
            {{ t.nav.downloadCv }}
          </a>
          <button
            type="button"
            class="cursor-pointer rounded-md p-2 text-gray-500 hover:text-gray-600 lg:hidden"
            aria-controls="mobile-menu"
            :aria-expanded="menuOpen"
            :aria-label="menuOpen ? t.nav.closeMenu : t.nav.openMenu"
            @click="menuOpen = !menuOpen"
          >
            <AppIcon :name="menuOpen ? 'close' : 'menu'" class="size-6" />
          </button>
        </div>
      </div>

      <ul v-show="menuOpen" id="mobile-menu" class="flex flex-col border-t border-white/5 py-2 lg:hidden">
        <li v-for="id in SECTIONS" :key="id">
          <a
            :href="`#${id}`"
            class="block rounded-md px-3 py-3 text-gray-500 hover:bg-gray-200 hover:text-gray-600"
            @click="closeMenu"
          >
            {{ t.nav.sections[id] }}
          </a>
        </li>
        <li class="sm:hidden">
          <a
            :href="cvUrl(locale)"
            download
            class="my-2 flex items-center justify-center gap-2 rounded-full bg-red px-4 py-3 text-sm font-semibold text-gray-100"
            @click="closeMenu"
          >
            <AppIcon name="download" class="size-4" />
            {{ t.nav.downloadCv }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>
