import type { Content } from './types'
import { projectAssets, roleStacks } from './shared'

export const en: Content = {
  meta: {
    title: 'Arthur Fernandes | Full-Stack Developer Java / Spring Boot / Vue.js',
    description:
      'Portfolio of Arthur Fernandes, Full-Stack Developer at Algar Telecom: Java 21, Spring Boot, Vue.js and Oracle/MySQL. Experience, projects, education and contact.',
    htmlLang: 'en',
  },

  nav: {
    skipToContent: 'Skip to content',
    sections: {
      sobre: 'About',
      experiencia: 'Experience',
      projetos: 'Projects',
      formacao: 'Education',
      habilidades: 'Skills',
      contato: 'Contact',
    },
    downloadCv: 'Resume',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    languageLabel: 'Language',
  },

  hero: {
    greeting: { before: 'Hello World! My name is', after: "and I'm a" },
    roleTitle: 'Full-Stack Developer',
    roleStack: 'Java / Spring Boot / Vue.js',
    tagline:
      '3+ years of experience at Algar Telecom, building Urano V2 — a high-availability SMS and voice campaign platform — with Java 21, Spring Boot, Vue.js and Oracle/MySQL.',
    availability: 'Uberlândia, MG, Brazil · open to remote work',
    ctaContact: 'Get in touch',
    ctaCv: 'Download resume',
    photoAlt: 'Photo of Arthur Fernandes',
    scrollHint: 'Go to the professional summary',
  },

  about: {
    eyebrow: 'About me',
    title: 'Summary',
    summary: [
      'Full-Stack Developer with 3+ years of experience at Algar Telecom, building Urano V2 — a high-availability SMS and voice campaign platform averaging ~100k messages per hour during campaigns over a database of 10M+ records — with Java 21, Spring Boot, Vue.js and Oracle/MySQL.',
      'Experienced in microservices, query and performance optimization, load testing, design patterns and CI/CD. Single-handedly designed and built MarisCorrige, a school management platform in production with 130 active students, on a 5-microservice Java architecture with JWT and rate limiting.',
      'I use AI tools (Claude Code, GitHub Copilot) in my workflow to ship faster without compromising quality. Pursuing a B.Sc. in Computer Science at UFU (expected 07/2027).',
    ],
    metrics: [
      { value: '3+', label: 'years of experience at Algar Telecom' },
      { value: '~100k', label: 'messages per hour during Urano V2 campaigns' },
      { value: '10M+', label: 'records in the Urano V2 database' },
      { value: '10x', label: 'faster message delivery after the sending-engine overhaul' },
      { value: '~1.8x', label: 'faster large reports (from ~5 to under 3 min)' },
      { value: '130', label: 'active students on MarisCorrige, in production' },
    ],
  },

  experience: {
    eyebrow: 'Experience',
    title: 'Professional experience',
    currentBadge: 'Current',
    roles: [
      {
        title: 'Junior Full-Stack Developer',
        company: 'Algar Telecom',
        period: '02/2025 – Present',
        location: 'Uberlândia, Brazil',
        current: true,
        highlights: [
          'Develop Urano V2, a high-availability SMS and voice campaign platform (~100k messages/hour on average during campaigns; 10M+ records), building REST APIs in Java 21/Spring Boot and the Vue.js frontend.',
          'Contributed to a performance overhaul of the sending engine (multithreading + a custom in-house processing queue, no external broker) that made message delivery about **10x faster** than the previous version.',
          'Optimized report generation (multiple Oracle queries), cutting large reports from ~5 to under 3 minutes (**~1.8x faster**); implemented asynchronous Excel report generation with status polling.',
          'Ran JMeter load tests on the message-intake API, uncovering missing Oracle indexes that caused timeouts (ORA-01013), and optimized the main messages view (UNION query).',
          "Refactored SMS routing across multiple providers using the Factory and Strategy patterns, decoupling each integration's logic.",
          'Lead the migration of legacy SMS services (Kannel) to Urano V2 and tune Oracle and MySQL performance (indexes, views, DDL scripts, JPA/HikariCP connection pooling).',
          'Took part in Urano V2 development meetings from start to finish, including architecture and business-rule decisions.',
        ],
        stack: roleStacks.junior,
      },
      {
        title: 'Software Development Intern',
        company: 'Algar Telecom',
        period: '07/2023 – 01/2025',
        location: 'Uberlândia, Brazil',
        current: false,
        highlights: [
          'Built REST APIs in Java 17/Spring Boot within a cross-functional agile squad (Scrum).',
          'Built a complete Python/Flask web application for data lookup, integrating relational databases and low-code (Oracle APEX).',
        ],
        stack: roleStacks.intern,
      },
    ],
  },

  projects: {
    eyebrow: 'My work',
    title: 'Featured projects',
    privateSource: 'Private source code',
    viewSource: 'View code',
    featured: {
      name: 'MarisCorrige',
      tagline: 'School Management and Automated Grading Platform',
      context: 'Personal project in production, 130 active students',
      period: '08/2026 – Present',
      badges: ['130 active students', '5 microservices', 'In production'],
      highlights: [
        'Single-handedly designed and built a 5-microservice architecture in Java 21/Spring Boot 3 (gateway, authentication, classes, assignments, notifications), each with its own PostgreSQL schema.',
        'Secured the API with JWT (Spring Security + JJWT) and an in-memory rate-limiting filter (Bucket4j) with scan detection and automatic IP blocking, validated with automated tests (JUnit 5, AssertJ).',
        'Automated grading of objective questions and PDF report-card generation (OpenPDF); integrated automatic email notifications (Resend) with scheduled jobs.',
        'Built the mobile-first frontend in Vue 3/TypeScript/Pinia/Tailwind CSS and deployed the system with Docker Compose and managed PostgreSQL (Supabase).',
      ],
      stack: projectAssets.marisCorrige.stack,
      icon: projectAssets.marisCorrige.icon,
    },
    others: [
      {
        name: 'DevFocus',
        tagline: 'Gamified task organizer',
        description: [
          'A “personal Jira with gamification”: areas, priorities and cards with due dates, a Duolingo-style daily streak, calendar history and email reminders.',
          'Vue 3 frontend that talks only to an API gateway; Node.js/Express microservices for cards, streaks and notifications, with scheduled jobs, plus Supabase (PostgreSQL + Auth) with Row Level Security so each user only reaches their own data.',
        ],
        stack: projectAssets.devFocus.stack,
        repoUrl: projectAssets.devFocus.repoUrl,
        image: projectAssets.devFocus.image,
        imageAlt: 'DevFocus main dashboard, showing the daily streak and the cards per area',
      },
    ],
  },

  education: {
    eyebrow: 'Education',
    title: 'Education',
    degree: {
      title: 'B.Sc. in Computer Science',
      institution: 'Federal University of Uberlândia (UFU), Brazil',
      expected: 'Expected graduation: 07/2027',
      notes: [
        'Coursework completed in 2026; only the final thesis remaining',
        'Hybrid program, completed alongside full-time work',
      ],
    },
    courses: {
      title: 'Courses',
      providers: [
        {
          name: 'Alura',
          items: [
            'Git and GitHub',
            'Spring Boot 3 – REST API Development in Java',
            'Spring Boot 3 – Best Practices and REST API Security',
          ],
        },
        { name: 'Rocketseat', items: ['Full-Stack Program', 'Python Program'] },
      ],
    },
    competitions: {
      title: 'Competitions',
      text: 'Programming contests (ICPC-style, 2021–2023) — algorithms, data structures and complexity analysis.',
    },
    languages: {
      title: 'Languages',
      items: [
        { name: 'Portuguese', level: 'native' },
        { name: 'English', level: 'intermediate technical reading, basic conversation (actively improving)' },
      ],
    },
  },

  skills: {
    eyebrow: 'Skills',
    title: 'Technical skills',
    groups: [
      { title: 'Languages', items: ['Java (17, 21)', 'TypeScript', 'JavaScript', 'Python', 'SQL'] },
      {
        title: 'Backend',
        items: [
          'Spring Boot',
          'Spring Security',
          'Spring Data JPA',
          'Hibernate',
          'Spring Cloud Gateway',
          'REST APIs',
          'Microservices',
          'JWT',
          'Multithreading',
          'Flask',
          'SMPP (SMS messaging)',
        ],
      },
      { title: 'Frontend', items: ['Vue.js 3', 'TypeScript', 'Pinia', 'PrimeVue', 'Tailwind CSS'] },
      {
        title: 'Databases',
        items: ['Oracle SQL', 'MySQL', 'PostgreSQL', 'Query optimization', 'Indexes and views', 'HikariCP'],
      },
      {
        title: 'Testing and Quality',
        items: ['JUnit 5', 'Mockito', 'AssertJ', 'JMeter (load testing)', 'Design Patterns (Factory, Strategy)'],
      },
      {
        title: 'DevOps and Infrastructure',
        items: [
          'Docker',
          'Docker Compose',
          'CI/CD (GitHub Actions, Bitbucket Pipelines)',
          'Grafana',
          'Linux (Ubuntu)',
          'Apache (load balancer)',
          'SSH',
          'systemd',
        ],
      },
      {
        title: 'Tools and Practices',
        items: ['Git', 'GitHub', 'Bitbucket', 'SVN', 'Conventional Commits', 'Scrum', 'Kanban'],
      },
      {
        title: 'AI-assisted development',
        items: ['Claude Code', 'GitHub Copilot'],
        note: 'Coding, debugging and technical documentation.',
      },
    ],
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Like what you see?',
    subtitle: 'Reach me on any of the channels below.',
    channels: { linkedin: 'LinkedIn', github: 'GitHub', whatsapp: 'WhatsApp', email: 'Email' },
  },

  footer: {
    builtWith: 'Built with Vue 3, TypeScript and Tailwind CSS',
    source: 'Source code on GitHub',
  },
}
