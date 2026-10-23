import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { en } from '../en'
import { pt } from '../pt'
import { contactEmail, cvFiles, whatsAppUrl } from '../shared'

/** Estrutura do conteúdo sem os textos: chaves, tamanhos de listas e tipos. */
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, shape(inner)]))
  }
  return typeof value
}

function strings(value: unknown, path = ''): [string, string][] {
  if (typeof value === 'string') return [[path, value]]
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, inner]) => strings(inner, `${path}.${key}`))
  }
  return []
}

describe('conteúdo do site', () => {
  it('tem a mesma estrutura em português e inglês', () => {
    expect(shape(en)).toEqual(shape(pt))
  })

  it.each([
    ['pt', pt],
    ['en', en],
  ])('não tem textos vazios (%s)', (_, content) => {
    for (const [path, text] of strings(content)) {
      expect(text.trim(), path).not.toBe('')
    }
  })

  it('aponta para PDFs de currículo que existem em public/', () => {
    const publicDir = resolve(dirname(fileURLToPath(import.meta.url)), '../../../public')
    for (const file of Object.values(cvFiles)) {
      expect(existsSync(resolve(publicDir, file)), file).toBe(true)
    }
  })

  it('decodifica os contatos guardados em base64', () => {
    expect(contactEmail()).toMatch(/^[^\s@]+@gmail\.com$/)
    expect(whatsAppUrl()).toMatch(/^https:\/\/wa\.me\/55\d{10,11}$/)
  })
})
