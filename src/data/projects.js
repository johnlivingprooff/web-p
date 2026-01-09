// Centralized project metadata used across views/components
export const projects = [
  {
    id: '81px',
    title: '81PIXELS',
    href: 'https://81px.vercel.app/',
    image: '/imgs/projs/web-apps.png',
    summary: 'A showcase of creative web applications and interactions.',
    tags: ['showcase', 'apps', 'creative'],
    status: 'live'
  },
  {
    id: 'pocketflow',
    title: 'PocketFlow',
    href: 'https://pf.eiteone.org/',
    image: '/imgs/projs/pocketFlow.jpg',
    summary: 'A mobile app for quick capture of Income and expense; cashflow—fast, focused, and always at hand.',
    tags: ['mobile', 'app', 'productivity'],
    status: 'live'
  },
  {
    id: 'wasa',
    title: 'Work & Study Abroad',
    href: 'https://wasa-mw.vercel.app/',
    image: '/imgs/projs/wasa.jpg',
    summary: 'Informational website for opportunities to work and study abroad.',
    tags: ['info', 'education'],
    status: 'live'
  },
  {
    id: 'eden',
    title: 'Eden Estate Hotel & Resort',
    href: 'https://edenestatesmw-v2.vercel.app/',
    image: '/imgs/clients/04.png',
    summary: 'Hospitality website for a hotel & resort.',
    tags: ['hospitality', 'booking'],
    status: 'live'
  },
  {
    id: 'campus-unlimited',
    title: 'Campus Unlimited',
    href: 'https://sam-book-store.vercel.app/',
    image: '/imgs/projs/campus_u.jpg',
    summary: 'Campus bookstore and content hub.',
    tags: ['education', 'commerce'],
    status: 'live'
  },
  {
    id: 'oak',
    title: 'O. A. K',
    href: 'https://oak-ul-us.vercel.app/',
    image: '/imgs/projs/desktop.png',
    summary: 'Agri-science platform to monitor crop plantation.',
    tags: ['agri', 'platform'],
    status: 'building'
  },
  {
    id: 'alo-hospital',
    title: 'Alo-Hospital',
    href: 'https://hospitalmanagementmihr.netlify.app/',
    image: '/imgs/projs/social_cover_2.png',
    summary: 'Enterprise-grade hospital management system.',
    tags: ['health', 'enterprise'],
    status: 'live'
  },
  {
    id: 'habicore-pos',
    title: 'Habicore POS',
    href: 'https://habicore-pos-frontend.vercel.app/',
    image: '/imgs/projs/lane-1_catalog-B.png',
    summary: 'Sales & inventory management with manufacturing features.',
    tags: ['commerce', 'pos', 'manufacturing'],
    status: 'live'
  },
  {
    id: 'alo-sales',
    title: 'Alo-Sales',
    href: 'https://alo-sales.eiteone.org/',
    image: '/imgs/projs/web-apps.png',
    summary: 'Sales dashboard for tracking performance, analytics, and customer insights.',
    tags: ['commerce', 'platform', 'enterprise'],
    status: 'live'
  }
];

export const allTags = Array.from(
  new Set(projects.flatMap(p => p.tags))
).sort();
