import { computed, readonly, ref } from 'vue'
import { en } from '../content/en'
import { pt } from '../content/pt'
import type { Content, Locale } from '../content/types'

const STORAGE_KEY = 'portfolio-locale'

export const contents: Record<Locale, Content> = { pt, en }

export function isLocale(value: unknown): value is Locale {
  return value === 'pt' || value === 'en'
}

/**
 * Ordem de prioridade: `?lang=` na URL (para mandar o link já em inglês), depois a escolha
 * salva do visitante e, por fim, o idioma do navegador: português para quem usa pt-*,
 * inglês para o resto.
 */
export function detectLocale(search: string, stored: string | null, browserLanguages: readonly string[]): Locale {
  const fromUrl = new URLSearchParams(search).get('lang')
  if (isLocale(fromUrl)) return fromUrl
  if (isLocale(stored)) return stored

  const preferred = browserLanguages[0]?.toLowerCase()
  if (!preferred) return 'pt'
  return preferred.startsWith('pt') ? 'pt' : 'en'
}

function readStoredLocale(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

const locale = ref<Locale>(
  detectLocale(window.location.search, readStoredLocale(), navigator.languages ?? [navigator.language]),
)

function setLocale(next: Locale) {
  locale.value = next
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // Armazenamento bloqueado (ex.: aba anônima): a troca vale só para esta visita.
  }

  // Se o link veio com ?lang=, atualiza para não "voltar" ao idioma antigo ao recarregar.
  const url = new URL(window.location.href)
  if (url.searchParams.has('lang')) {
    url.searchParams.set('lang', next)
    history.replaceState(history.state, '', url)
  }
}

export function useLocale() {
  const t = computed(() => contents[locale.value])
  return { locale: readonly(locale), t, setLocale }
}
