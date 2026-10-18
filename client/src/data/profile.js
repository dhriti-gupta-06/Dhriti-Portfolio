/**
 * Single source of truth for personal details.
 * Values set to null are hidden on the site until you fill them in.
 */
export const profile = {
  name: 'Dhriti Gupta',
  shortName: 'Dhriti',
  initials: 'DG',
  designation: 'Aspiring Software Engineer | Full-Stack Developer | AI/ML Enthusiast | Cloud Computing Enthusiast',
  // Phrases cycled by the hero typewriter.
  roles: ['Aspiring Software Engineer', 'Full-Stack Developer', 'AI/ML Enthusiast', 'Cloud Computing Enthusiast'],
  headline:
    'I build full-stack products end to end, from React interfaces and REST APIs to the machine-learning models behind them.',
  location: 'Jaipur, Rajasthan, India',
  locationAddress: '85, Jagdamba Colony, Dher Ka Balaji, Sikar Road, Jaipur, Rajasthan, India',
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    '85, Jagdamba Colony, Dher Ka Balaji, Sikar Road, Jaipur, Rajasthan, India',
  )}`,
  status: 'Third-year B.Tech CSE undergraduate at JK Lakshmipat University',
  availability: 'Open to software engineering and AI/ML internships',

  email: 'dhritigupta2411@gmail.com',
  phone: null, // Optional. Left out of the site on purpose; add a string to show it.

  photo: {
    src: '/images/dhriti-gupta.webp',
    fallback: '/images/dhriti-gupta.jpg',
    alt: 'Portrait of Dhriti Gupta in a black blazer',
  },

  socials: {
    github: 'https://github.com/dhriti-gupta-06',
    linkedin: 'https://www.linkedin.com/in/dhriti-gupta-557101314/',
  },

  bio: [
    "I'm a Computer Science undergraduate at JK Lakshmipat University, Jaipur (batch of 2028), and I spent January–May 2026 as a Visiting Undergraduate Student at IIT Kanpur, taking advanced Computer Science coursework.",
    'Most of what I build sits where web engineering meets machine learning: a stroke-risk platform that serves seven trained classifiers through a Flask API and a React dashboard, a retrieval-augmented document assistant running on a local LLM, and a sales forecaster backed by 500 group-wise Prophet models.',
    'This summer I worked as a Data Science Intern at Veracitiz, building preprocessing pipelines and doing exploratory analysis on structured datasets. I am now looking for internships where I can ship production software and keep getting better at backend systems and applied AI.',
  ],

  quickFacts: [
    { label: 'Degree', value: 'B.Tech, Computer Science & Engineering' },
    { label: 'University', value: 'JK Lakshmipat University, Jaipur' },
    { label: 'Batch', value: '2024 – 2028' },
    { label: 'CGPA', value: '8.541 / 10' },
  ],
};
