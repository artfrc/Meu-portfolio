import { afterEach, describe, expect, it } from 'vitest'
import { contents, detectLocale, useLocale } from '../useLocale'

describe('detectLocale', () => {
  it('prioriza ?lang= na URL', () => {
    expect(detectLocale('?lang=en', 'pt', ['pt-BR'])).toBe('en')
  })

  it('usa a escolha salva quando a URL não define o idioma', () => {
    expect(detectLocale('', 'en', ['pt-BR'])).toBe('en')
  })

  it('ignora valores desconhecidos', () => {
    expect(detectLocale('?lang=es', 'fr', ['pt-BR'])).toBe('pt')
  })

  it('usa português para navegadores em pt-*', () => {
    expect(detectLocale('', null, ['pt-PT', 'en-US'])).toBe('pt')
  })

  it('usa inglês para os demais idiomas', () => {
    expect(detectLocale('', null, ['de-DE', 'pt-BR'])).toBe('en')
  })

  it('cai em português sem informação do navegador', () => {
    expect(detectLocale('', null, [])).toBe('pt')
  })
})

describe('useLocale', () => {
  afterEach(() => {
    history.replaceState(null, '', '/')
  })

  it('troca o conteúdo e salva a escolha', () => {
    const { t, locale, setLocale } = useLocale()

    setLocale('en')
    expect(locale.value).toBe('en')
    expect(t.value).toBe(contents.en)
    expect(localStorage.getItem('portfolio-locale')).toBe('en')

    setLocale('pt')
    expect(t.value).toBe(contents.pt)
    expect(localStorage.getItem('portfolio-locale')).toBe('pt')
  })

  it('atualiza ?lang= quando o link veio com ele', () => {
    history.replaceState(null, '', '/?lang=pt#contato')

    useLocale().setLocale('en')

    expect(window.location.search).toBe('?lang=en')
    expect(window.location.hash).toBe('#contato')
  })

  it('não adiciona ?lang= quando a URL não tinha', () => {
    useLocale().setLocale('en')

    expect(window.location.search).toBe('')
  })
})
