# Dhriti Gupta: MERN Portfolio

The personal portfolio of **Dhriti Gupta**, a B.Tech CSE student at JK Lakshmipat University who builds full-stack apps and AI/ML projects.

It's a full MERN application. The **React + Vite** client presents profile, skills, projects, experience and achievements. The **Node.js + Express** API stores contact-form messages in **MongoDB** through **Mongoose** and serves the resume as PDF and Word downloads.

- **Live site:** _add after deploying, e.g. `https://dhriti-gupta.vercel.app`_
- **API:** _add after deploying, e.g. `https://dhriti-portfolio-api.onrender.com/api/health`_
- **Repository:** _add after pushing, e.g. `https://github.com/dhriti-gupta-06/dhriti-portfolio`_

| Dark | Light |
| --- | --- |
| ![Hero, dark theme](docs/screenshots/hero-dark.png) | ![Hero, light theme](docs/screenshots/hero-light.png) |

| Mobile | Contact form (stored in MongoDB) |
| --- | --- |
| ![Mobile layout](docs/screenshots/mobile-dark.png) | ![Contact success](docs/screenshots/contact-success.png) |

---

## Features

**Frontend**
- Animated hero: typewriter role line, entrance animation, a **Download CV** button that uses the Express route, and an **Explore projects** button.
- About section with profile photo, bio, location, education facts and current status.
- Skills grouped into six categories, with animated bars and tooltips that open on hover *and* on keyboard focus. Levels are self-assessed and labelled that way.
- Project cards with working technology filters (All / Machine Learning / AI-LLM / Full-Stack / Frontend), an empty state, GitHub and live-demo links, and a case-study page for each project at `/projects/:slug`.
- Animated vertical timeline that marks education and experience differently.
- Achievements and certifications. Credential links and images show up once you add them to the data file.
- Resume section with **PDF** and **Word (.docx)** downloads from the backend.
- Contact form: controlled inputs, inline accessible validation, loading state, double-submit guard. Success shows only after the server confirms the message was stored.
- Dark and light themes that follow the system setting on the first visit, remember the visitor's choice and avoid a wrong-theme flash on load.
- React Router SPA with a custom 404 page, smooth in-page navigation, an active-section indicator and a mobile menu.
- Accessibility: semantic landmarks, skip link, visible focus styles, labelled controls, `aria-live` status messages and `prefers-reduced-motion` support.

**Backend**
- `POST /api/contact`: validation and sanitising, Mongoose schema rules, rate limiting, safe error responses, and logs that never record message content.
- `GET /api/resume/pdf` and `GET /api/resume/docx`: real file downloads with the correct MIME type and `Content-Disposition: attachment`. A missing file returns a 404.
- `GET /api/health`: liveness and database status.
- Helmet security headers, CORS restricted to `CLIENT_URL`, a 10 kb JSON body limit, a central error handler and graceful shutdown.

## Tech stack

| Layer | Technology |
| --- | --- |
| Client | React 19, React Router 7, Vite 8, Tailwind CSS 4, Framer Motion |
| Server | Node.js 20+, Express 5, Mongoose 9, Helmet, express-rate-limit, validator |
| Database | MongoDB Atlas |
| Testing | `node:test` + Supertest (API), Vitest (client logic), Playwright smoke test |
| Hosting | Vercel (client), Render (API), MongoDB Atlas (DB) |

## Architecture

```text
 Browser (React SPA on Vercel)
   │  GET  /api/resume/:format  ──►  Express (Render) ──► server/resumes/*.pdf|.docx
   │  POST /api/contact         ──►  Express  ──► validate ──► Mongoose ──► MongoDB Atlas
   │  GET  /api/health          ──►  Express
```

In development, Vite proxies `/api/*` to `http://localhost:5000`, so the client needs no environment variables. In production the client calls the URL in `VITE_API_BASE_URL`.

## Folder structure

```text
dhriti-portfolio/
├── client/                    React + Vite frontend
│   ├── public/                favicon, images/dhriti-gupta.{webp,jpg}
│   ├── src/
│   │   ├── components/        Navbar, Footer, ProjectCard, SkillBar, ThemeToggle, Reveal, Icons…
│   │   ├── sections/          Hero, About, Skills, Projects, Experience, Achievements, Resume, Contact
│   │   ├── pages/             Home, ProjectPage (/projects/:slug), NotFound
│   │   ├── data/              ← EDIT CONTENT HERE: profile, skills, projects, timeline, achievements
│   │   ├── context/           ThemeContext
│   │   ├── hooks/             useTypewriter, useActiveSection
│   │   ├── services/api.js    all fetch calls + resume URLs
│   │   └── utils/             client-side validation (+ tests)
│   ├── vercel.json            SPA rewrites + asset caching
│   └── .env.example
├── server/                    Express API
│   ├── config/                env + MongoDB connection
│   ├── controllers/           contact, resume, health
│   ├── middleware/            rate limiters, error handler
│   ├── models/Contact.js      Mongoose schema
│   ├── routes/index.js
│   ├── resumes/               Dhriti_Gupta_Resume.pdf / .docx (served by the API)
│   ├── utils/                 validation, HttpError
│   ├── tests/                 API tests
│   ├── app.js / server.js
│   └── .env.example
├── docs/                      screenshots, requirements audit
├── render.yaml                Render blueprint for the API
└── package.json               root scripts
```

## Prerequisites

- Node.js **20 or newer** (22 LTS recommended) and npm
- A free MongoDB Atlas account
- Git, plus GitHub, Vercel and Render accounts for deployment

## Local setup (Windows PowerShell)

```powershell
cd dhriti-portfolio
npm run install:all                       # installs root, server and client deps

Copy-Item server\.env.example server\.env
notepad server\.env                       # paste your MONGODB_URI (see Atlas section)

npm run dev                               # API on :5000, site on http://localhost:5173
```

macOS/Linux: use `cp server/.env.example server/.env` in place of `Copy-Item`.

Other scripts:

| Command (from repo root) | What it does |
| --- | --- |
| `npm run dev:server` / `npm run dev:client` | run one side only |
| `npm run build` | production build of the client into `client/dist` |
| `npm start` | start the API in production mode |
| `npm test` | API tests + client tests |

To run the database tests against a real database as well:

```powershell
$env:TEST_MONGODB_URI = "mongodb+srv://<user>:<password>@<cluster>/portfolio_test"
npm test --prefix server
```

## Environment variables

**server/.env**

| Variable | Example | Notes |
| --- | --- | --- |
| `PORT` | `5000` | Render sets this automatically |
| `NODE_ENV` | `development` / `production` | |
| `MONGODB_URI` | `mongodb+srv://…/portfolio?retryWrites=true&w=majority` | **secret**, never commit |
| `CLIENT_URL` | `http://localhost:5173` or `https://dhriti-gupta.vercel.app` | comma-separated list allowed; no trailing slash |
| `CONTACT_RATE_LIMIT_MAX` | `5` | optional, messages per window per IP |
| `CONTACT_RATE_LIMIT_WINDOW_MS` | `900000` | optional, default 15 minutes |

**client/.env.local** (production values go in the Vercel dashboard)

| Variable | Example | Notes |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `https://dhriti-portfolio-api.onrender.com` | public. Never put secrets in `VITE_` variables, because they end up in the browser bundle |

## MongoDB Atlas setup

1. Sign in at <https://cloud.mongodb.com>, create a **Project**, then **Create → M0 (Free)** cluster.
2. **Database Access → Add New Database User**: choose *Password* auth, generate a strong password, role **Read and write to any database** (or restrict it to the `portfolio` database).
3. **Network Access → Add IP Address**:
   - For local development, *Add Current IP Address*.
   - For Render's free tier (no fixed outbound IP), add `0.0.0.0/0`. Your strong password, TLS and the URI kept in env vars protect access.
4. **Database → Connect → Drivers → Node.js**: copy the URI, replace `<password>`, and add the database name before the `?`:
   `mongodb+srv://dhriti:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority&appName=portfolio`
   Special characters in the password must be URL-encoded.
5. Put it in `server/.env` locally and in Render → *Environment* in production.
6. Verify: submit the contact form, then open **Atlas → Browse Collections → portfolio → contacts**. The message should appear with `createdAt` and `status: "new"`.

## API reference

### `GET /api/health`
`200 {"status":"ok","database":"connected","uptimeSeconds":42,"timestamp":"…"}`

### `POST /api/contact`
Body (JSON):

```json
{ "name": "Ada Lovelace", "email": "ada@example.com", "message": "Hi Dhriti, …" }
```

| Rule | Limit |
| --- | --- |
| `name` | required string, 2–80 chars (whitespace collapsed) |
| `email` | required, valid address, ≤ 254 chars, stored lowercase |
| `message` | required string, 10–2000 chars |

| Status | Meaning | Body |
| --- | --- | --- |
| 201 | stored | `{"success":true,"message":"…","data":{"id":"…","createdAt":"…"}}` |
| 400 | validation failed / invalid JSON | `{"success":false,"message":"…","errors":{"email":"…"}}` |
| 403 | origin not allowed by CORS | |
| 413 | body larger than 10 kb | |
| 429 | rate limit (5 per 15 min per IP by default) | |
| 503 | database unavailable (the client shows an error, not a fake success) | |
| 500 | unexpected error (no stack trace is returned) | |

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:5000/api/contact `
  -ContentType "application/json" `
  -Body '{"name":"Test User","email":"test@example.com","message":"Hello from PowerShell!"}'
```

### `GET /api/resume/pdf` · `GET /api/resume/docx`
They stream `server/resumes/Dhriti_Gupta_Resume.pdf` / `.docx` with `Content-Type` set to `application/pdf` / `application/vnd.openxmlformats-officedocument.wordprocessingml.document` and `Content-Disposition: attachment`. If the file is missing they return a 404 JSON response.

**To update the resume:** replace the two files in `server/resumes/` and keep the same filenames, then commit and push. Render redeploys automatically.

> Privacy note: the resume includes your phone number. Because the API serves the files, they're committed to the repo, so anyone who opens the repo or downloads the resume can see the number. If you don't want that, remove the number from both files before pushing.

## Deployment

### 1. Push to GitHub (PowerShell)

```powershell
cd dhriti-portfolio
git init
git add .
git status                      # confirm NO .env files and NO node_modules are listed
git commit -m "feat: MERN portfolio with contact API and resume downloads"
git branch -M main
git remote add origin https://github.com/dhriti-gupta-06/dhriti-portfolio.git   # create the empty repo on GitHub first
git push -u origin main
```

### 2. API on Render

1. Render → **New → Web Service** → connect the repo. Alternatively use **New → Blueprint**, which reads `render.yaml`.
2. Settings: **Root Directory** `server`, **Build** `npm ci --omit=dev`, **Start** `npm start`, **Health Check Path** `/api/health`.
3. Environment: `NODE_ENV=production`, `MONGODB_URI=<Atlas URI>`, `CLIENT_URL=<your Vercel URL>` (fill this in after step 3, then redeploy).
4. Deploy, then open `https://<service>.onrender.com/api/health`. It should report `"database":"connected"`.

The free tier sleeps after about 15 minutes idle, so the first request can take 30–60 s. The client allows up to 60 s for the contact request.

### 3. Client on Vercel

1. Vercel → **Add New → Project** → import the repo.
2. **Root Directory** `client` (framework *Vite* is detected; `vercel.json` adds SPA rewrites).
3. Environment variable: `VITE_API_BASE_URL=https://<service>.onrender.com` (no trailing slash).
4. Deploy. Then put the Vercel URL into Render's `CLIENT_URL` and redeploy the API.

### 4. Post-deploy checklist

- [ ] Site loads over HTTPS; refreshing `/projects/neuralstroke` doesn't 404
- [ ] `/api/health` shows `database: connected`
- [ ] Contact form shows success **and** the document appears in Atlas
- [ ] Both resume buttons download files
- [ ] Browser devtools console shows no CORS errors
- [ ] Theme toggle works and persists
- [ ] Search the built JS for secrets: `Select-String -Path client\dist\assets\*.js -Pattern "mongodb"` should find nothing

## Editing content

Everything shown on the site comes from `client/src/data/`:

| File | Contains |
| --- | --- |
| `profile.js` | name, designation, headline, bio, email, socials, photo |
| `skills.js` | categories and self-assessed levels (0–100) |
| `projects.js` | projects, filter categories, links, case-study text |
| `timeline.js` | education and experience (VINS internship template is commented in) |
| `achievements.js` | honours and certifications; add `issuer`, `date`, `url`, `image` |

Fields set to `null` are hidden, so the site never shows a placeholder link.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Contact form says "service temporarily unavailable" | API can't reach MongoDB: check `MONGODB_URI`, Atlas Network Access and the password encoding |
| Browser console shows a CORS error | `CLIENT_URL` on Render must match the site origin exactly (scheme + host, no trailing slash) |
| Resume buttons give 404 | files missing from `server/resumes/` or renamed |
| Refreshing a sub-page on Vercel gives 404 | make sure the Vercel root directory is `client` so `vercel.json` is used |
| First request is very slow | Render free tier cold start; it's expected |
| `npm run dev` port in use | stop the other process or change `PORT` / the Vite port |

## Security notes

- `.env` files are git-ignored; only `.env.example` files with placeholders are committed.
- Secrets live only on the server (`MONGODB_URI`). The client has no secrets.
- If a secret was ever committed, deleting it in a later commit does **not** make it safe, because it stays in git history. **Rotate it**: in Atlas, edit the database user and set a new password (or delete the user and create a new one), update `MONGODB_URI` on Render and locally, and then, optionally, purge the history with `git filter-repo`.
- The contact API accepts only plain strings (blocking `$`-operator injection), enforces size limits, rate-limits per IP, and never logs message content.

## Testing

- `npm test --prefix server`: 20 API tests covering health, both resume routes, missing files, unknown format, CORS allow and deny, preflight, required fields, invalid email, oversized message, whitespace-only input, operator injection, malformed JSON, body-size limit, database-down 503, real persistence (when `TEST_MONGODB_URI` is set) and rate limiting.
- `npm test --prefix client`: validation rules and project-data integrity (at least 3 featured projects, each with a GitHub link; https links; unique slugs).
- An end-to-end browser pass (Playwright) covered the items listed in `docs/REQUIREMENTS_AUDIT.md`.

---

© Dhriti Gupta
