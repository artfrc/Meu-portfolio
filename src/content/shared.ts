// Dados que não mudam com o idioma: links, stacks, imagens e arquivos do currículo.
import type { Locale } from './types'

import javaIcon from '../assets/icons/tech/java.svg'
import springIcon from '../assets/icons/tech/spring.svg'
import vueIcon from '../assets/icons/tech/vuejs.svg'
import typescriptIcon from '../assets/icons/tech/typescript.svg'
import oracleIcon from '../assets/icons/tech/oracle.svg'
import postgresqlIcon from '../assets/icons/tech/postgresql.svg'
import mysqlIcon from '../assets/icons/tech/mysql.svg'
import dockerIcon from '../assets/icons/tech/docker.svg'
import marisCorrigeIcon from '../assets/projects/mariscorrige-icon.webp'
import devFocusImage from '../assets/projects/devfocus.webp'

export const links = {
  linkedin: 'https://www.linkedin.com/in/fernandes-arthur/',
  github: 'https://github.com/artfrc',
  portfolioRepo: 'https://github.com/artfrc/Meu-portfolio',
  devFocusRepo: 'https://github.com/artfrc/dev-focus',
} as const

/** Caminhos relativos ao `base` do Vite (arquivos em public/cv). */
export const cvFiles: Record<Locale, string> = {
  pt: 'cv/Arthur_Fernandes_Desenvolvedor_FullStack.pdf',
  en: 'cv/Arthur_Fernandes_FullStack_Developer_EN.pdf',
}

export function cvUrl(locale: Locale): string {
  return `${import.meta.env.BASE_URL}${cvFiles[locale]}`
}

// E-mail e WhatsApp ficam em base64 para não aparecerem em texto puro no código
// publicado: afasta robôs simples que varrem páginas e repositórios atrás de contatos.
const encodedEmail = 'Y3JmZXJuYW5kZXNhcnRodXJAZ21haWwuY29t'
const encodedWhatsApp = 'NTUzNDk4MzI0NDMz'

export function contactEmail(): string {
  return atob(encodedEmail)
}

export function whatsAppUrl(): string {
  return `https://wa.me/${atob(encodedWhatsApp)}`
}

export const heroStack = [
  { name: 'Java', icon: javaIcon },
  { name: 'Spring Boot', icon: springIcon },
  { name: 'Vue.js', icon: vueIcon },
  { name: 'TypeScript', icon: typescriptIcon },
  { name: 'Oracle', icon: oracleIcon },
  { name: 'PostgreSQL', icon: postgresqlIcon },
  { name: 'MySQL', icon: mysqlIcon },
  { name: 'Docker', icon: dockerIcon },
] as const

export const roleStacks = {
  junior: ['Java 21', 'Spring Boot', 'Vue.js', 'Oracle', 'MySQL', 'JPA/HikariCP', 'JMeter', 'Multithreading', 'Design Patterns'],
  intern: ['Java 17', 'Spring Boot', 'Python', 'Flask', 'Oracle APEX', 'Scrum'],
} as const

export const projectAssets = {
  marisCorrige: {
    icon: marisCorrigeIcon,
    stack: [
      'Java 21',
      'Spring Boot 3',
      'Spring Cloud Gateway',
      'Spring Security',
      'JWT',
      'Bucket4j',
      'PostgreSQL',
      'Supabase',
      'Vue 3',
      'TypeScript',
      'Pinia',
      'Tailwind CSS',
      'Docker Compose',
      'OpenPDF',
      'Resend',
      'JUnit 5',
    ],
  },
  devFocus: {
    image: devFocusImage,
    repoUrl: links.devFocusRepo,
    stack: ['Vue 3', 'Pinia', 'Vue Router', 'Tailwind CSS', 'Node.js', 'Express', 'Supabase', 'PostgreSQL', 'node-cron', 'Nodemailer'],
  },
} as const
