/**
 * Achievements and certifications, taken from the resume.
 *
 * Fields set to null are hidden in the UI. Fill them in from LinkedIn or the
 * certificate itself; never guess an issuer, date or URL.
 *   issuer   – organisation that issued it
 *   date     – e.g. 'Mar 2025'
 *   url      – public verification link (opens in a new tab)
 *   image    – path under client/public, e.g. '/images/certs/python.webp'
 */
export const achievements = [
  {
    id: 'vc-honor-list',
    kind: 'Honor',
    title: "Vice Chancellor's Honor List",
    issuer: 'JK Lakshmipat University',
    description: 'Recognised for academic excellence.',
    date: null,
    url: null,
    image: null,
  },
  {
    id: 'openai-nxtwave-buildathon',
    kind: 'Hackathon',
    title: 'OpenAI × NxtWave Buildathon',
    issuer: 'OpenAI × NxtWave',
    description: 'Recognised for system design innovation.',
    date: null,
    url: null,
    image: '/images/certs/OpenAI_Academy_NxtWave.jpeg',
  },
  {
    id: 'nptel-employment-communication',
    kind: 'Course',
    title: 'Employment Communication: A Lab-Based Course',
    issuer: 'NPTEL',
    description: 'Finished in the top 2% of candidates.',
    date: null,
    url: null,
    image: '/images/certs/Employment_Communication_Course.jpg',
  },
  {
    id: 'iitk-exchange',
    kind: 'Academic',
    title: 'Visiting Undergraduate Student, IIT Kanpur',
    issuer: 'IIT Kanpur',
    description: 'Selected for a competitive semester exchange (Jan – May 2026).',
    date: '2026',
    url: null,
    image: null,
  },
  {
    id: 'python-for-everybody',
    kind: 'Certification',
    title: 'Python for Everybody',
    issuer: "Coursera", // TODO(Dhriti): add issuer from the certificate
    description: null,
    date: null,
    url: "https://www.coursera.org/account/accomplishments/verify/IQY10D47BJV5",
    image: null,
  },
  {
    id: 'exploring-c',
    kind: 'Certification',
    title: 'Exploring C',
    issuer: "Coursera", // TODO(Dhriti)
    description: null,
    date: null,
    url: "https://www.coursera.org/account/accomplishments/verify/RZAEASQX4P1S",
    image: null,
  },
  {
    id: 'Database-Management-System-Part-1',
    kind: 'Certification',
    title: 'Database Management System - Part 1',
    issuer: "Infosys Springboard", // TODO(Dhriti)
    description: null,
    date: null,
    url: null,
    image: '/images/certs/DBMS.jpg',
  },
];
