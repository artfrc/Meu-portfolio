import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { useLocale } from '../../composables/useLocale'
import ContactSection from '../ContactSection.vue'

describe('ContactSection', () => {
  beforeEach(() => {
    useLocale().setLocale('pt')
  })

  it('lista LinkedIn, GitHub, WhatsApp e e-mail com os links certos', () => {
    const links = mount(ContactSection).findAll('a')

    expect(links.map((link) => link.text())).toEqual([
      expect.stringContaining('LinkedIn'),
      expect.stringContaining('GitHub'),
      expect.stringContaining('WhatsApp'),
      expect.stringContaining('E-mail'),
    ])
    expect(links[0].attributes('href')).toBe('https://www.linkedin.com/in/fernandes-arthur/')
    expect(links[1].attributes('href')).toBe('https://github.com/artfrc')
    expect(links[2].attributes('href')).toMatch(/^https:\/\/wa\.me\/55\d{10,11}$/)
    expect(links[3].attributes('href')).toMatch(/^mailto:[^\s@]+@gmail\.com$/)
  })

  it('abre os links externos em outra aba, mas não o e-mail', () => {
    const links = mount(ContactSection).findAll('a')

    for (const link of links.slice(0, 3)) {
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
    }
    expect(links[3].attributes('target')).toBeUndefined()
  })

  it('acompanha o idioma escolhido', async () => {
    const wrapper = mount(ContactSection)

    useLocale().setLocale('en')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Reach me on any of the channels below.')
    expect(wrapper.text()).toContain('Email')
  })
})
