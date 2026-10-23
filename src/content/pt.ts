import type { Content } from './types'
import { projectAssets, roleStacks } from './shared'

export const pt: Content = {
  meta: {
    title: 'Arthur Fernandes | Desenvolvedor Full-Stack Java / Spring Boot / Vue.js',
    description:
      'Portfólio de Arthur Fernandes, desenvolvedor Full-Stack na Algar Telecom: Java 21, Spring Boot, Vue.js e Oracle/MySQL. Experiência, projetos, formação e contato.',
    htmlLang: 'pt-BR',
  },

  nav: {
    skipToContent: 'Pular para o conteúdo',
    sections: {
      sobre: 'Sobre',
      experiencia: 'Experiência',
      projetos: 'Projetos',
      formacao: 'Formação',
      habilidades: 'Habilidades',
      contato: 'Contato',
    },
    downloadCv: 'Baixar CV',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    languageLabel: 'Idioma',
  },

  hero: {
    greeting: { before: 'Hello World! Meu nome é', after: 'e sou' },
    roleTitle: 'Desenvolvedor Full-Stack',
    roleStack: 'Java / Spring Boot / Vue.js',
    tagline:
      'Mais de 3 anos de experiência na Algar Telecom, construindo o Urano V2 — plataforma de campanhas de SMS e voz de alta disponibilidade — com Java 21, Spring Boot, Vue.js e Oracle/MySQL.',
    availability: 'Uberlândia, MG · disponível para trabalho remoto',
    ctaContact: 'Fale comigo',
    ctaCv: 'Baixar currículo',
    photoAlt: 'Foto de Arthur Fernandes',
    scrollHint: 'Ir para o resumo profissional',
  },

  about: {
    eyebrow: 'Sobre mim',
    title: 'Resumo profissional',
    summary: [
      'Desenvolvedor Full-Stack com mais de 3 anos de experiência na Algar Telecom, construindo o Urano V2 — plataforma de campanhas de SMS e voz de alta disponibilidade, com média de ~100 mil mensagens por hora em períodos de campanha e base de mais de 10 milhões de registros — usando Java 21, Spring Boot, Vue.js e Oracle/MySQL.',
      'Experiência com microsserviços, otimização de consultas e performance, testes de carga, design patterns e CI/CD. Projetei e implementei sozinho o MarisCorrige, sistema de gestão escolar em produção com 130 alunos ativos, em arquitetura de 5 microsserviços Java com JWT e rate limiting.',
      'Uso ferramentas de IA (Claude Code, GitHub Copilot) no fluxo de desenvolvimento para ganhar velocidade sem abrir mão de qualidade. Cursando Ciência da Computação na UFU (previsão de conclusão: 07/2027).',
    ],
    metrics: [
      { value: '3+', label: 'anos de experiência na Algar Telecom' },
      { value: '~100 mil', label: 'mensagens por hora em campanhas no Urano V2' },
      { value: '10M+', label: 'registros na base do Urano V2' },
      { value: '10x', label: 'envio de mensagens mais rápido após a reformulação do motor' },
      { value: '~1,8x', label: 'relatórios grandes mais rápidos (de ~5 para menos de 3 min)' },
      { value: '130', label: 'alunos ativos no MarisCorrige, em produção' },
    ],
  },

  experience: {
    eyebrow: 'Experiência',
    title: 'Trajetória profissional',
    currentBadge: 'Atual',
    roles: [
      {
        title: 'Desenvolvedor Full-Stack Júnior',
        company: 'Algar Telecom',
        period: '02/2025 – Atual',
        location: 'Uberlândia, MG',
        current: true,
        highlights: [
          'Desenvolvo o Urano V2, plataforma de campanhas de SMS e voz de alta disponibilidade (~100 mil mensagens/hora em campanhas; mais de 10 milhões de registros), com APIs REST em Java 21/Spring Boot e frontend Vue.js.',
          'Contribuí para a reformulação de performance do motor de envio (multithreading + fila de processamento própria, sem broker externo), que tornou o envio de mensagens cerca de **10x mais rápido** que a versão anterior.',
          'Otimizei a geração de relatórios (múltiplas consultas Oracle), reduzindo relatórios grandes de ~5 para menos de 3 minutos (**~1,8x mais rápido**); implementei a geração assíncrona de relatórios Excel com acompanhamento de status por polling.',
          'Executei testes de carga com JMeter na API de recebimento de mensagens, identificando índices ausentes no Oracle que causavam timeouts (ORA-01013), e otimizei a view principal de mensagens (consulta com UNION).',
          'Refatorei o roteamento de SMS multiprovedor com os padrões Factory e Strategy, desacoplando a lógica de cada integração.',
          'Conduzo a migração de serviços legados (Kannel) para o Urano V2 e otimizo consultas e performance em Oracle e MySQL (índices, views, scripts DDL, pool de conexões JPA/HikariCP).',
          'Participei das reuniões de desenvolvimento do Urano V2 do início ao fim, incluindo decisões de arquitetura e regras de negócio.',
        ],
        stack: roleStacks.junior,
      },
      {
        title: 'Estagiário de Desenvolvimento',
        company: 'Algar Telecom',
        period: '07/2023 – 01/2025',
        location: 'Uberlândia, MG',
        current: false,
        highlights: [
          'Implementei APIs REST em Java 17/Spring Boot em squad multidisciplinar, com metodologias ágeis (Scrum).',
          'Criei um sistema em Python/Flask para consulta de dados via web, integrando bancos relacionais e low-code (Oracle APEX).',
        ],
        stack: roleStacks.intern,
      },
    ],
  },

  projects: {
    eyebrow: 'Meu trabalho',
    title: 'Projetos em destaque',
    privateSource: 'Código-fonte privado',
    viewSource: 'Ver código',
    featured: {
      name: 'MarisCorrige',
      tagline: 'Plataforma de Gestão Escolar e Correção Automática',
      context: 'Projeto pessoal em produção, com 130 alunos ativos',
      period: '08/2026 – Atual',
      badges: ['130 alunos ativos', '5 microsserviços', 'Em produção'],
      highlights: [
        'Projetei e implementei sozinho uma arquitetura de 5 microsserviços em Java 21/Spring Boot 3 (gateway, autenticação, turmas, atividades, notificações), cada um com schema próprio no PostgreSQL.',
        'Protegi a API com JWT (Spring Security + JJWT) e um filtro de rate limiting em memória (Bucket4j) com detecção de scanning e bloqueio automático de IPs, validado com testes automatizados (JUnit 5, AssertJ).',
        'Automatizei a correção de questões objetivas e a geração de boletins em PDF (OpenPDF); integrei avisos automáticos por e-mail (Resend) com jobs agendados.',
        'Desenvolvi o frontend em Vue 3/TypeScript/Pinia/Tailwind CSS (mobile-first) e publiquei o sistema via Docker Compose, com PostgreSQL gerenciado (Supabase).',
      ],
      stack: projectAssets.marisCorrige.stack,
      icon: projectAssets.marisCorrige.icon,
    },
    others: [
      {
        name: 'DevFocus',
        tagline: 'Organizador de tarefas com gamificação',
        description: [
          'Um “Jira pessoal com gamificação”: áreas, prioridades e cards com prazo, ofensiva diária no estilo Duolingo, histórico em calendário e lembretes por e-mail.',
          'Frontend em Vue 3 que fala só com um API gateway; microsserviços Node.js/Express para cards, ofensiva e notificações, com jobs agendados, e Supabase (PostgreSQL + Auth) com Row Level Security para cada usuário acessar só os próprios dados.',
        ],
        stack: projectAssets.devFocus.stack,
        repoUrl: projectAssets.devFocus.repoUrl,
        image: projectAssets.devFocus.image,
        imageAlt: 'Painel principal do DevFocus, com a ofensiva diária e os cards por área',
      },
    ],
  },

  education: {
    eyebrow: 'Formação',
    title: 'Formação acadêmica',
    degree: {
      title: 'Bacharelado em Ciência da Computação',
      institution: 'Universidade Federal de Uberlândia (UFU)',
      expected: 'Previsão de conclusão: 07/2027',
      notes: ['Disciplinas concluídas em 2026, falta só o TCC', 'Modalidade híbrida, conciliada com o trabalho'],
    },
    courses: {
      title: 'Cursos complementares',
      providers: [
        {
          name: 'Alura',
          items: [
            'Git e GitHub',
            'Spring Boot 3 – Desenvolvimento de API REST em Java',
            'Spring Boot 3 – Boas Práticas e Proteção de API REST',
          ],
        },
        { name: 'Rocketseat', items: ['Formação Full-Stack', 'Formação Python'] },
      ],
    },
    competitions: {
      title: 'Competições',
      text: 'Maratonas de Programação (2021–2023) — algoritmos, estruturas de dados e análise de complexidade.',
    },
    languages: {
      title: 'Idiomas',
      items: [
        { name: 'Português', level: 'nativo' },
        { name: 'Inglês', level: 'leitura técnica intermediária, conversação básica (em desenvolvimento)' },
      ],
    },
  },

  skills: {
    eyebrow: 'Habilidades',
    title: 'Competências técnicas',
    groups: [
      { title: 'Linguagens', items: ['Java (17, 21)', 'TypeScript', 'JavaScript', 'Python', 'SQL'] },
      {
        title: 'Backend',
        items: [
          'Spring Boot',
          'Spring Security',
          'Spring Data JPA',
          'Hibernate',
          'Spring Cloud Gateway',
          'APIs REST',
          'Microsserviços',
          'JWT',
          'Multithreading',
          'Flask',
          'SMPP (mensageria SMS)',
        ],
      },
      { title: 'Frontend', items: ['Vue.js 3', 'TypeScript', 'Pinia', 'PrimeVue', 'Tailwind CSS'] },
      {
        title: 'Banco de Dados',
        items: ['Oracle SQL', 'MySQL', 'PostgreSQL', 'Otimização de consultas', 'Índices e views', 'HikariCP'],
      },
      {
        title: 'Testes e Qualidade',
        items: ['JUnit 5', 'Mockito', 'AssertJ', 'JMeter (testes de carga)', 'Design Patterns (Factory, Strategy)'],
      },
      {
        title: 'DevOps e Infraestrutura',
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
        title: 'Ferramentas e Metodologias',
        items: ['Git', 'GitHub', 'Bitbucket', 'SVN', 'Conventional Commits', 'Scrum', 'Kanban'],
      },
      {
        title: 'IA aplicada ao desenvolvimento',
        items: ['Claude Code', 'GitHub Copilot'],
        note: 'Apoio à codificação, debugging e documentação técnica.',
      },
    ],
  },

  contact: {
    eyebrow: 'Contato',
    title: 'Gostou do meu trabalho?',
    subtitle: 'Fale comigo por um dos canais abaixo.',
    channels: { linkedin: 'LinkedIn', github: 'GitHub', whatsapp: 'WhatsApp', email: 'E-mail' },
  },

  footer: {
    builtWith: 'Feito com Vue 3, TypeScript e Tailwind CSS',
    source: 'Código-fonte no GitHub',
  },
}
