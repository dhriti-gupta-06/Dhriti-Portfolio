/**
 * Skill levels are SELF-ASSESSED estimates (0–100), not test scores.
 * Adjust them freely; the labels below are derived from the number.
 *
 * Rough guide:
 *   80+  Strong     — used across several projects, can go deep in interviews
 *   65+  Proficient — built real features with it
 *   50+  Working    — used in at least one project, still learning
 *   <50  Familiar   — explored or used lightly
 */
export const levelLabel = (level) => {
  if (level >= 80) return 'Strong';
  if (level >= 65) return 'Proficient';
  if (level >= 50) return 'Working knowledge';
  return 'Familiar';
};

export const skillGroups = [
  {
    id: 'languages',
    title: 'Programming Languages',
    blurb: 'DSA and coursework in C/C++, product work in Python and JavaScript.',
    skills: [
      { name: 'Python', level: 80, note: 'ML pipelines, Flask & FastAPI backends' },
      { name: 'C++', level: 72, note: 'Data structures & algorithms' },
      { name: 'JavaScript', level: 72, note: 'React frontends, Node/Express APIs' },
      { name: 'C', level: 65, note: 'Systems coursework' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    blurb: 'Responsive, accessible interfaces for data-heavy applications.',
    skills: [
      { name: 'React.js', level: 75, note: 'Dashboards, routing, auth flows' },
      { name: 'HTML5', level: 82, note: 'Semantic, accessible markup' },
      { name: 'CSS3', level: 75, note: 'Layout, theming, animation' },
      { name: 'Tailwind CSS', level: 72, note: 'Used across NeuralStroke & SalesCast' },
      { name: 'Vite', level: 65, note: 'Dev server, proxies, builds' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    blurb: 'REST services with auth, validation and role-based access.',
    skills: [
      { name: 'Flask', level: 75, note: 'JWT auth, RBAC, ML inference APIs' },
      { name: 'REST APIs', level: 75, note: 'Resource design, status codes, validation' },
      { name: 'FastAPI', level: 62, note: 'DocuMind RAG backend' },
      { name: 'Node.js', level: 60, note: 'This portfolio’s API' },
      { name: 'Express.js', level: 60, note: 'Routing, middleware, rate limiting' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    blurb: 'Relational, document and vector stores.',
    skills: [
      { name: 'SQLite', level: 72, note: 'SQLAlchemy models, indexed schemas' },
      { name: 'MongoDB', level: 60, note: 'Document storage for this portfolio' },
      { name: 'Mongoose', level: 58, note: 'Schemas & validation' },
      { name: 'ChromaDB', level: 60, note: 'Persistent vector store for RAG' },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI / Machine Learning',
    blurb: 'Classical ML on imbalanced data and LLM-powered retrieval.',
    skills: [
      { name: 'Scikit-learn', level: 75, note: 'Baselines, preprocessing, evaluation' },
      { name: 'LightGBM / XGBoost / CatBoost', level: 72, note: 'Gradient-boosted classifiers' },
      { name: 'Feature Engineering', level: 72, note: 'Encoding, scaling, imputation' },
      { name: 'LangChain & RAG', level: 65, note: 'Chunking, retrieval, grounding' },
      { name: 'Hugging Face Embeddings', level: 60, note: 'all-MiniLM-L6-v2' },
      { name: 'Ollama (local LLMs)', level: 60, note: 'llama3.1:8b' },
      { name: 'Prophet', level: 62, note: 'Group-wise time-series forecasting' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Technologies',
    blurb: 'Version control and deployment.',
    skills: [
      { name: 'Git & GitHub', level: 75, note: 'Daily workflow' },
      { name: 'VS Code', level: 80, note: 'Primary editor' },
      { name: 'Vercel', level: 62, note: 'Frontend deployments' },
      { name: 'Render', level: 55, note: 'Backend deployments' },
    ],
  },
];
