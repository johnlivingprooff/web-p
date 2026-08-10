// Centralized project metadata used across views/components
export const projects = [
  {
    id: '81px',
    title: '81PIXELS',
    href: 'https://eiteone.org',
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
    href: 'https://edenestatesmw.com/',
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
  },
  {
    id: 'we-care-malawi',
    title: 'We Care Malawi',
    href: 'https://wecaremalawi.com',
    image: '/imgs/projs/web-apps.png',
    summary: 'Website for We Care Malawi.',
    tags: ['nonprofit', 'community'],
    status: 'live'
  },
  {
    id: '265-business-angels',
    title: '265 Business Angels',
    href: 'https://265businessangels.org',
    image: '/imgs/projs/web-apps.png',
    summary: 'Website for 265 Business Angels.',
    tags: ['business', 'community'],
    status: 'live'
  }
];

export const allTags = Array.from(
  new Set(projects.flatMap(p => p.tags))
).sort();
