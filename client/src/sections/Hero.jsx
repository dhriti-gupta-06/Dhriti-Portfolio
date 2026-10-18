import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { profile } from '../data/profile.js';
import { useTypewriter } from '../hooks/useTypewriter.js';
import ResumeButtons from '../components/ResumeButtons.jsx';
import { ArrowRight, PinIcon } from '../components/Icons.jsx';

const ease = [0.22, 1, 0.36, 1];
const item = (delay) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

const NOW = [
  { k: 'Studying', v: 'B.Tech CSE · JK Lakshmipat University', d: '2024 – 2028' },
  { k: 'Exchange', v: 'Visiting UG Student · IIT Kanpur', d: 'Jan – May 2026' },
  { k: 'Interned', v: 'Data Science Intern · Veracitiz', d: 'May – Jul 2026' },
  { k: 'Building', v: 'ML-backed full-stack apps', d: 'Ongoing' },
];

export default function Hero() {
  const typed = useTypewriter(profile.roles);

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 md:pb-28">
      {/* Background: blueprint grid fading out + warm glow */}
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_75%_65%_at_30%_35%,black,transparent)]" />
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-32 -z-10 size-[38rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--glow), transparent 65%)' }}
      />

      <div className="container-page grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:items-end">
        <div>
          <motion.p {...item(0)} className="eyebrow flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {profile.availability}
          </motion.p>

          <motion.h1
            {...item(0.08)}
            id="hero-title"
            className="mt-6 font-serif text-[clamp(3.2rem,11vw,7.5rem)] leading-[0.92] tracking-[-0.02em]"
          >
            Dhriti <em className="text-accent">Gupta</em>
          </motion.h1>

          <motion.p {...item(0.16)} className="mt-6 min-h-[1.6em] font-mono text-base sm:text-lg" aria-hidden="true">
            <span className="text-muted">&gt; </span>
            {typed}
            <span className="caret" />
          </motion.p>
          {/* Screen readers get the full designation once instead of the animation. */}
          <p className="sr-only">{profile.designation}</p>

          <motion.p {...item(0.24)} className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted sm:text-xl">
            {profile.headline}
          </motion.p>

          <motion.div {...item(0.32)} className="mt-9 flex flex-wrap items-center gap-3">
            <ResumeButtons variant="cv" />
            <Link to="/#projects" className="btn-ghost">
              Explore projects <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.p {...item(0.4)} className="mt-8 flex items-center gap-2 text-sm text-muted">
            <PinIcon size={16} /> {profile.location}
          </motion.p>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          aria-label="Current status"
          className="card relative p-6 shadow-card sm:p-7"
        >
          <p className="eyebrow">Right now</p>
          <dl className="mt-5 divide-y divide-line">
            {NOW.map((row) => (
              <div key={row.k} className="grid grid-cols-[5.5rem_1fr] gap-3 py-3.5 text-sm">
                <dt className="font-mono text-xs leading-6 text-muted uppercase">{row.k}</dt>
                <dd>
                  <span className="block">{row.v}</span>
                  <span className="mt-0.5 block font-mono text-xs text-muted">{row.d}</span>
                </dd>
              </div>
            ))}
          </dl>
        </motion.aside>
      </div>
    </section>
  );
}
