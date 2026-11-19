// Single source of truth for Work. Own products only.
// Items with `soon: true` are empty placeholders: listed, but not clickable and with no detail page.
export const projects = [
  {
    id: 'rbnetwork',
    category: 'Own product',
    name: 'rbnetwork.my',
    subtitle: 'News and analysis on search and the web',
    title: 'rbnetwork.my',
    role: 'Built and run',
    desc: 'A bilingual news and analysis site on SEO, AI search and web development, in English and Bahasa Melayu.',
    about:
      'rbnetwork.my covers SEO, AI search and web development for people who do this work every day. Articles are published in English and Bahasa Melayu, each one labelled as reporting or interpretation, linked to its original sources, and dated when published and updated.',
    tools: ['Astro', 'English + Bahasa Melayu', 'RSS', 'Light and dark themes'],
    live: 'https://rbnetwork.my',
    github: null,
    image: '/rbnetwork.webp',
  },
  { id: 'soon-1', soon: true, name: 'Coming soon' },
  { id: 'soon-2', soon: true, name: 'Coming soon' },
  { id: 'soon-3', soon: true, name: 'Coming soon' },
]

export const liveProjects = projects.filter((p) => !p.soon)
