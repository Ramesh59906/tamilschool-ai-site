/** Mirrors tamilschool.ai landing copy (en translation). */

export const NAV_LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Modules', href: '#modules' },
  { label: 'Tracking', href: '#analytics' },
  { label: 'Teachers', href: '#teachers' },
  { label: 'Vocabulary', href: '#vocabulary' },
  { label: 'Safety', href: '#safety' },
]

export const NAV_AUTH = [
  { label: 'Admin Login', href: '#/login', variant: 'link' },
  { label: 'Request access', href: '#/signup', variant: 'cta' },
]

export const HERO = {
  trustTitle: 'Trusted by schools and families',
  title: 'Reimagining Tamil Education for the AI Generation.',
  subtitle: 'AI Tutors, Real Time Conversations, Tamil Fluency.',
  tamilBanner: 'தமிழ் கற்றல் மையம்',
  trustPills: ['Tamil Nadu Schools', 'CBSE Schools', 'International Tamil'],
  ctaLogin: 'Log in',
  ctaRequest: 'Request access',
  /** Full-bleed art in /public/images — swap for your own render or photo */
  backgroundImage: 'https://tamilschool.ai/images/tkm-hero.jpg.jpeg',
}

export const HOW = {
  title: 'How it works',
  subtitle: 'Start with the AI Tamil Bot in 4 simple steps.',
  steps: [
    {
      n: 'Step 1',
      title: 'Select Grade',
      text: 'Choose the learner\u2019s grade to match the right lessons.',
    },
    {
      n: 'Step 2',
      title: 'Pick a Topic',
      text: 'Choose role-play, stories, or activities.',
    },
    {
      n: 'Step 3',
      title: 'Speak or Type',
      text: 'Answer by voice or text — the AI guides you.',
    },
    {
      n: 'Step 4',
      title: 'Feedback & Progress',
      text: 'Instant results and track what you learned.',
    },
  ],
}

export const CORE_MODULES = {
  title: 'Core Modules',
  subtitle: 'Speaking, writing, stories, and rhymes.',
  cta: 'Explore all modules',
  modules: [
    {
      title: 'Practice Speaking',
      subtitle: 'Conversation practice that feels real.',
      items: ['Real-time practice', 'Many characters', 'Context-based Tamil'],
      icon: 'chat',
    },
    {
      title: 'Creative Writing',
      subtitle: 'Write on topics + optional voice input.',
      items: ['Writing practice', 'Voice input option', 'Helpful feedback'],
      icon: 'pen',
    },
    {
      title: 'Animated Stories',
      subtitle: 'Kid-friendly stories with questions.',
      items: ['Age-appropriate stories', 'Comprehension skills', 'Fun characters'],
      icon: 'book',
    },
    {
      title: 'Animated Rhymes',
      subtitle: 'Learn Tamil with music and rhythm.',
      items: ['Pronunciation practice', 'Easy to remember', 'Fun learning'],
      icon: 'music',
    },
  ],
}

export const ANALYTICS = {
  title: 'Reports & Analytics',
  subtitle: 'See learning progress in one place.',
  body: 'Teachers and parents can track time spent, vocabulary learned, and generate reports.',
  stats: [
    { value: '124', label: 'Sessions' },
    { value: '87', label: 'Mastery %', valueSuffix: '%' },
    { value: '420', label: 'Vocabulary growth', valueSuffix: ' words' },
  ],
}

export const TEACHERS = {
  title: 'Teacher Dashboard',
  subtitle: 'Class management + reports — all in one.',
  bullets: [
    'Overall class progress',
    'Download reports for admin/parents',
    'Assign lessons easily',
    'Track vocabulary growth',
  ],
  cta: 'More features for teachers',
}

export const VOCABULARY = {
  title: 'Vocabulary & Games',
  subtitle: 'Word of the day, meaning, cards, and fun games.',
  tabs: [
    {
      label: 'Dictionary',
      text: 'Meanings and examples for words.',
    },
    {
      label: 'Flashcards',
      text: 'Learn faster with audio flashcards.',
    },
    {
      label: 'Word of the day',
      text: 'Correct pronunciation and sample sentences.',
    },
  ],
}

export const TESTIMONIALS = {
  title: 'What teachers say',
  subtitle: 'School and family experiences.',
  items: [
    {
      quote: 'Kids love speaking with this Tamil bot.',
      author: 'Priya',
      role: 'Teacher, Chennai',
    },
    {
      quote: 'Progress reports help parents understand clearly.',
      author: 'Raj',
      role: 'School Management',
    },
    {
      quote: 'A very safe app for kids to use confidently.',
      author: 'Lakshmi',
      role: 'Parent',
    },
  ],
}

export const SAFETY = {
  title: 'Safety & Privacy',
  subtitle: 'Built safe for children and schools.',
  items: ['COPPA & GDPR rules', 'Privacy controls', 'Child safety design'],
  body: 'We never sell your data. Full control stays with you.',
  privacyLabel: 'Privacy policy',
  privacyHref: 'https://tamilschool.ai/privacy',
}

export const FOOTER = {
  ctaTitle: 'Ready to start?',
  ctaSubtitle: 'Log in or request access for your school.',
  copyright: 'TKM - Tamil Katral Maiyam. All rights reserved.',
}
