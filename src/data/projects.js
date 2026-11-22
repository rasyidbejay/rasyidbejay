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
  {
    id: 'gist',
    category: 'Own product',
    name: 'Gist',
    subtitle: 'The gist of every meeting',
    title: 'Gist',
    role: 'Designed and built',
    desc: 'An AI meeting notetaker. It records or joins your calls, writes the notes, and lets an agent answer questions across every meeting with citations that jump to the exact second.',
    about:
      'Gist turns meetings into transcripts, summaries, decisions and action items. You can record in the browser, upload a file, send a bot into a live Zoom, Meet or Teams call, or use my Chrome extension to capture a meeting tab and your microphone. An agent then answers questions across all your meetings, cites the exact moment in the recording, and writes Word, Excel and PowerPoint files from them. Teams share a workspace, and one workspace can never read another\'s data: an 83-check adversarial test suite attacks every route to prove it. Jobs run on a crash-safe Postgres queue, and the agent is contained, with human approval for anything risky and a spending cap on every chat.',
    tools: [
      'Next.js 16',
      'TypeScript',
      'Postgres',
      'AI agent with citations',
      'Chrome extension',
      'Whisper + Claude',
      'Multi-tenant security',
      'Light and dark themes',
    ],
    live: null,
    github: null,
    image: '/gist.webp',
  },
  { id: 'soon-2', soon: true, name: 'Coming soon' },
  { id: 'soon-3', soon: true, name: 'Coming soon' },
]

export const liveProjects = projects.filter((p) => !p.soon)
