/**
 * Education & experience timeline, newest first.
 * type: 'education' | 'experience'
 */
export const timeline = [
  {
    id: 'veracitiz',
    type: 'experience',
    title: 'Data Science Intern',
    organization: 'Veracitiz Solutions',
    period: 'May 2026 – Jul 2026',
    location: null,
    points: [
      'Built data preprocessing pipelines and performed exploratory data analysis on structured datasets for ML workflows.',
      'Applied feature engineering and data preparation techniques to produce model-ready datasets.',
      'Supported ML model development through structured analysis, evaluation and experimentation.',
    ],
    tags: ['Python', 'EDA', 'Feature Engineering', 'Model Evaluation'],
  },
  {
    id: 'iitk',
    type: 'education',
    title: 'Visiting Undergraduate Student (Semester Exchange)',
    organization: 'Indian Institute of Technology Kanpur',
    period: 'Jan 2026 – May 2026',
    location: 'Kanpur, Uttar Pradesh',
    points: ['Selected for a competitive academic exchange programme; completed advanced Computer Science coursework.'],
    tags: ['Computer Science'],
  },
  {
    id: 'jklu',
    type: 'education',
    title: 'B.Tech, Computer Science & Engineering',
    organization: 'JK Lakshmipat University',
    period: '2024 – 2028',
    location: 'Jaipur, Rajasthan',
    points: ['Expected graduation: July 2028. Current CGPA 8.54 / 10.', "Named on the Vice Chancellor's Honor List for academic excellence."],
    tags: ['Data Structures', 'Algorithms', 'Software Engineering'],
  },
  // TODO(Dhriti): add the VINS internship (Oct 2026 –) once the title and
  // responsibilities are final, e.g.
  // { id: 'vins', type: 'experience', title: '...', organization: 'VINS', period: 'Oct 2026 – Present', points: ['...'], tags: [] },
];
