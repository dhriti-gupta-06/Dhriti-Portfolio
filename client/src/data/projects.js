/**
 * Project data. Every claim here was checked against the project's source code
 * and README. Live links were checked on 17 Oct 2026.
 *
 * - categories drive the filter chips on the Projects section.
 * - repo / live: set to null when unavailable; the UI then hides the button
 *   (never link to a placeholder).
 */
export const projectCategories = [
  { id: 'all', label: 'All' },
  { id: 'ml', label: 'Machine Learning' },
  { id: 'genai', label: 'AI / LLM' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'frontend', label: 'Frontend' },
];

export const projects = [
  {
    slug: 'neuralstroke',
    title: 'NeuralStroke',
    subtitle: 'Clinical risk intelligence platform',
    featured: true,
    categories: ['ml', 'fullstack'],
    summary:
      'A full-stack stroke-risk platform that runs seven trained classifiers on patient health data, with LightGBM as the production model and role-based access for doctors and admins.',
    problem:
      'Stroke datasets are heavily imbalanced: a model that predicts “no stroke” for everyone looks accurate while missing the patients who matter. Clinicians also need more than a probability: explanations, history and batch screening.',
    features: [
      'Single-patient analysis runs all 7 models (Logistic Regression, Decision Tree, Random Forest, Random Forest + SMOTE, XGBoost, CatBoost, LightGBM) and shows a risk gauge with per-model results.',
      'Recall-oriented 10% decision threshold, with risk bands from Low to Critical.',
      'Batch prediction from CSV/Excel uploads, downloadable Excel results and PDF risk reports.',
      'Rule-based explanations that attribute risk to factors such as age, hypertension, glucose, BMI and smoking.',
      'JWT authentication with server-side role scoping: doctors only see their own records; admins can filter analytics by user.',
      'Analytics from saved predictions plus model-performance charts and confusion matrices from offline training metrics.',
    ],
    contribution: [
      'Trained and benchmarked the seven models on imbalanced data, tuning the decision threshold for minority-class recall.',
      'Built the Flask REST API (inference, batch processing, records, analytics, PDF generation) with SQLAlchemy + SQLite storage.',
      'Built the React + Vite + Tailwind dashboard, including auth context, protected routes and the patient-history modal.',
      'Deployed the frontend on Vercel and the API on Render.',
    ],
    stack: ['Python', 'LightGBM', 'XGBoost', 'CatBoost', 'scikit-learn', 'Flask', 'SQLAlchemy', 'SQLite', 'JWT', 'React', 'Vite', 'Tailwind CSS'],
    repo: 'https://github.com/dhriti-gupta-06/Stroke-Prediction-System',
    live: 'https://stroke-prediction-system.vercel.app',
    liveNote: 'Sign in with a demo account listed in the repository README. The API runs on Render’s free tier, so the first request after a while can take up to a minute.',
    disclaimer: 'Decision-support prototype for learning purposes. It is not a medical device and does not replace clinical judgement.',
  },
  {
    slug: 'salescast-ai',
    title: 'SalesCast AI',
    subtitle: 'Prophet sales forecasting system',
    featured: true,
    categories: ['ml', 'fullstack'],
    summary:
      'A forecasting web app that serves 500 group-wise Prophet models (one per product, department, category, outlet and state combination) behind a JWT-secured Flask API and a React analytics dashboard.',
    problem:
      'Retail sales behave differently across products, outlets and regions, so a single global model hides local patterns. Planners need per-group forecasts with uncertainty, and an audit trail of what was predicted.',
    features: [
      'Single-date predictions and 7-day batch forecasts with yhat_lower / yhat_upper confidence intervals.',
      'Group-wise model lookup across 500 trained Prophet models, with a global-mean fallback for unseen groups.',
      'SQL-driven analytics: trend, top products, state and category breakdowns, plus admin-only user activity.',
      'JWT authentication and server-side RBAC: users see only their own history, admins can filter by user.',
      'Indexed SQLite schema in WAL mode, paginated prediction history.',
    ],
    contribution: [
      'Trained the group-wise Prophet models and wrote the model-loading and inference service.',
      'Designed the Flask application factory, route blueprints and SQL data-access layer.',
      'Built the React 18 + Vite dashboard with Recharts visualisations and a responsive navigation.',
      'Added a training view backed by the saved training summary and validation report.',
    ],
    stack: ['Python', 'Prophet', 'pandas', 'Flask', 'JWT', 'SQLite', 'React', 'Vite', 'Tailwind CSS', 'Recharts'],
    repo: 'https://github.com/dhriti-gupta-06/Sales-Forecast-By-Prophet-Model',
    live: 'https://sales-forecast-by-prophet-model.vercel.app',
    liveNote: 'Demo credentials are listed in the repository README.',
    disclaimer: 'Academic project; figures are statistical estimates on a sample dataset.',
  },
  {
    slug: 'floatchat',
    title: 'FloatChat',
    subtitle: 'Conversational ocean-data explorer',
    featured: true,
    categories: ['frontend', 'genai'],
    summary:
      'A Next.js 14 + TypeScript prototype for exploring ARGO-style ocean float data through a chat assistant, a 3D globe, maps and predictive charts.',
    problem:
      'Oceanographic sensor data is dense and hard to explore for non-specialists. FloatChat asks whether a conversational interface plus interactive 3D and map views can make it approachable.',
    features: [
      'Interactive 3D globe of float positions built with Three.js / React Three Fiber.',
      'Chat assistant (“Wavvy”) with selectable personalities that answers questions about the loaded float and regional data.',
      'Plotly analytics for temperature, salinity and current trends, plus Leaflet 2D maps.',
      'Event-driven data service with Zustand state, error boundaries, loading skeletons and an AR view.',
    ],
    contribution: [
      'Designed and built the UI and component architecture in Next.js 14 with TypeScript.',
      'Implemented the data service, the Next.js API route and the chat response logic.',
      'Built the 3D, map and chart visualisations and the animated interface.',
    ],
    stack: ['Next.js 14', 'TypeScript', 'React', 'Three.js', 'React Three Fiber', 'Plotly', 'Leaflet', 'Zustand', 'Framer Motion', 'Tailwind CSS'],
    repo: 'https://github.com/dhriti-gupta-06/FloatChat',
    live: 'https://float-chat-coral.vercel.app',
    liveNote: null,
    disclaimer:
      'Prototype: the chat uses keyword-matched responses rather than a hosted LLM, and the sensor feeds currently use generated sample data.',
  },
  {
    slug: 'documind-rag',
    title: 'DocuMind',
    subtitle: 'Retrieval-augmented PDF assistant',
    featured: false,
    categories: ['genai', 'fullstack'],
    summary:
      'A document assistant that answers natural-language questions about uploaded PDFs using retrieval-augmented generation on a locally hosted LLM.',
    problem:
      'General-purpose LLMs answer confidently even when a document says otherwise. Grounding answers in retrieved passages from the user’s own PDFs keeps responses relevant and private.',
    features: [
      'PDF ingestion with PyPDFLoader, split into 500-character chunks with 100-character overlap.',
      'all-MiniLM-L6-v2 embeddings stored in a persistent ChromaDB collection.',
      'Document-scoped top-3 similarity retrieval using document-id metadata filtering.',
      'LangChain pipeline on a local Ollama llama3.1:8b model; FastAPI REST API with a React interface for upload, chat, history and document management.',
    ],
    contribution: ['Designed and built the ingestion, retrieval and generation pipeline, the FastAPI backend and the React interface.'],
    stack: ['Python', 'LangChain', 'ChromaDB', 'Hugging Face', 'Ollama', 'FastAPI', 'React'],
    repo: null, // TODO(Dhriti): add the GitHub URL once the repository is public.
    live: null, // Runs a local LLM, so there is no hosted demo.
    liveNote: 'Runs a local LLM through Ollama, so there is no hosted demo.',
    disclaimer: null,
  },
  {
    slug: 'todo-app',
    title: 'To-Do App',
    subtitle: 'Vanilla JavaScript task manager',
    featured: false,
    categories: ['frontend'],
    summary:
      'A responsive task manager built with plain HTML, CSS and JavaScript, with filters, counters and localStorage persistence.',
    problem: 'A focused exercise in DOM manipulation, event handling and browser storage without a framework.',
    features: [
      'Add, complete and delete tasks; clear all completed tasks.',
      'Filter by All / Pending / Completed, with live task counters.',
      'Tasks persist across reloads with the localStorage API.',
    ],
    contribution: ['Built the whole app and deployed it on GitHub Pages.'],
    stack: ['HTML', 'CSS', 'JavaScript', 'localStorage'],
    repo: 'https://github.com/dhriti-gupta-06/TO-DO-App',
    live: 'https://dhriti-gupta-06.github.io/TO-DO-App/',
    liveNote: null,
    disclaimer: null,
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
