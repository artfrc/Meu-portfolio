export type Locale = 'pt' | 'en'

/** Âncoras das seções (em PT, mantendo o #contato que já era usado em links antigos). */
export type SectionId = 'sobre' | 'experiencia' | 'projetos' | 'formacao' | 'habilidades' | 'contato'

interface SectionHeading {
  eyebrow: string
  title: string
}

export interface Metric {
  value: string
  label: string
}

export interface Role {
  title: string
  company: string
  period: string
  location: string
  current: boolean
  /** Trechos entre **asteriscos** aparecem em destaque, como no currículo. */
  highlights: string[]
  stack: readonly string[]
}

export interface FeaturedProject {
  name: string
  tagline: string
  context: string
  period: string
  badges: string[]
  highlights: string[]
  stack: readonly string[]
  icon: string
}

export interface Project {
  name: string
  tagline: string
  description: string[]
  stack: readonly string[]
  repoUrl: string
  image: string
  imageAlt: string
}

export interface SkillGroup {
  title: string
  items: string[]
  note?: string
}

export interface Content {
  meta: {
    title: string
    description: string
    htmlLang: string
  }
  nav: {
    skipToContent: string
    sections: Record<SectionId, string>
    downloadCv: string
    openMenu: string
    closeMenu: string
    languageLabel: string
  }
  hero: {
    greeting: { before: string; after: string }
    roleTitle: string
    roleStack: string
    tagline: string
    availability: string
    ctaContact: string
    ctaCv: string
    photoAlt: string
    scrollHint: string
  }
  about: SectionHeading & {
    summary: string[]
    metrics: Metric[]
  }
  experience: SectionHeading & {
    currentBadge: string
    roles: Role[]
  }
  projects: SectionHeading & {
    featured: FeaturedProject
    others: Project[]
    privateSource: string
    viewSource: string
  }
  education: SectionHeading & {
    degree: { title: string; institution: string; expected: string; notes: string[] }
    courses: { title: string; providers: { name: string; items: string[] }[] }
    competitions: { title: string; text: string }
    languages: { title: string; items: { name: string; level: string }[] }
  }
  skills: SectionHeading & {
    groups: SkillGroup[]
  }
  contact: SectionHeading & {
    subtitle: string
    channels: { linkedin: string; github: string; whatsapp: string; email: string }
  }
  footer: {
    builtWith: string
    source: string
  }
}
