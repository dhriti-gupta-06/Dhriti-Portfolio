# Requirements audit

Status key: ✅ implemented and tested · 🟡 implemented, needs your input or a deployment to verify · ⬜ not done

Testing used the production client build (`vite build` + `vite preview`), the Express API with `NODE_ENV=production`, and a real MongoDB-wire-protocol database. A headless Chromium browser (Playwright) ran 41 checks, all passing. API tests: 20/20 passing. Client tests: 6/6 passing. Tested on 17 Oct 2026.

## Required sections

| Requirement | Status | Where / evidence |
| --- | --- | --- |
| Animated hero with name, role, designation | ✅ | `sections/Hero.jsx` |
| Typewriter + scroll-triggered animation | ✅ | `hooks/useTypewriter.js`, `components/Reveal.jsx`; static text under reduced motion (tested) |
| Download CV CTA through the backend | ✅ | downloads `Dhriti_Gupta_Resume.pdf` from `/api/resume/pdf` (tested) |
| Professional background / gradient | ✅ | blueprint grid + radial glow + subtle grain |
| About bio, real photo, location, status | ✅ | `sections/About.jsx`, photo optimised to 21 KB WebP with JPG fallback |
| Animated About entrance | ✅ | `Reveal` on scroll |
| Skills grouped by category | ✅ | 6 groups in `data/skills.js` |
| Animated skill bars + tooltips + hover | ✅ | `SkillBar.jsx`; tooltip on hover **and** keyboard focus (tested) |
| ≥3 interactive project cards | ✅ | 3 featured + 2 more; hover lift and accent rule |
| Name, description, tech badges, GitHub link | ✅ | DocuMind has no public repo yet (see below) |
| Live demo links where available | ✅ | all 4 live URLs checked on 17 Oct 2026 |
| Project details view | ✅ | `/projects/:slug` case-study pages, survive refresh (tested) |
| Technology filtering | ✅ | real filtering, counts, empty state, `aria-pressed` (tested) |
| PDF resume via Express | ✅ | correct MIME + `Content-Disposition` (API + browser tested) |
| DOCX resume via Express | ✅ | same |
| Vertical animated timeline | ✅ | line draws on scroll; education vs experience colour and icon |
| Degrees, institutions, years; internship | ✅ | JKLU, IIT Kanpur exchange, Veracitiz |
| Certifications & achievements | 🟡 | listed from the resume; issuers/dates/verification URLs/images for the three certificates need your details |
| Contact form → Express → MongoDB | ✅ | 201 response, success after server confirmation, document found in DB (tested) |

## Technical

| Requirement | Status | Notes |
| --- | --- | --- |
| React + React Router SPA | ✅ | routes `/`, `/projects/:slug`, `*` (404) |
| Node + Express REST API | ✅ | Express 5 |
| MongoDB + Mongoose model & validation | ✅ | `models/Contact.js` |
| Responsive mobile / tablet / desktop | ✅ | no horizontal overflow at 360, 390, 768, 1024, 1440, 1920 px (tested) |
| Dark / light mode | ✅ | system preference, persistence, no flash (tested) |
| Accessibility | ✅ | skip link (tested), landmarks, labels, focus styles, aria-live, reduced motion |
| Env vars, `.env` git-ignored, no secrets | ✅ | `.env.example` files only |
| Rate limiting, CORS, sanitising | ✅ | tested (429, 403, operator injection) |
| Frontend deploy config | ✅ | `client/vercel.json` |
| Backend deploy config | ✅ | `render.yaml` |
| Deployed and verified live | 🟡 | needs your Vercel/Render/Atlas accounts; follow README → Deployment |
| Public GitHub repo | 🟡 | needs you to push (commands in README) |

## Things only you can provide

1. **MongoDB Atlas URI** → Render env var `MONGODB_URI`.
2. **DocuMind repository URL** → `client/src/data/projects.js` (`repo: null` for now; the card shows "Repository link coming soon").
3. **Certificate details** for *Python for Everybody*, *Exploring C*, *Generative AI Workshop*: issuer, date, verification URL, optional image → `client/src/data/achievements.js`. Optional dates/URLs for the honours too.
4. **VINS internship** title, dates and responsibilities → uncomment the template in `client/src/data/timeline.js`.
5. **Skill levels**: the defaults are conservative estimates; adjust them in `client/src/data/skills.js` so you're comfortable discussing them in interviews.
6. After deploying: live URLs in `README.md`, `CLIENT_URL` on Render, `VITE_API_BASE_URL` on Vercel.
7. Decide whether the phone number stays in the public resume files.

## Content decisions to review

- **FloatChat**: the code shows the chat replies come from keyword matching (no LLM API call), and the ARGO/INCOIS feeds fall back to generated sample data. The README makes stronger claims (real-time 4,000+ floats, LLM). The portfolio describes the project as it is actually implemented, so it holds up if a reviewer opens the code.
- **NeuralStroke ROC-AUC**: the resume says ~0.82–0.89, but the EDA notebook's highest printed ROC-AUC is ~0.84. No metric is shown on the site; add one only if you can point to where it comes from.
- **Docker / AWS** are left out of the skills, because none of the projects show hands-on use.
- The **Resume Parser** project is omitted because no repository or details were provided.
