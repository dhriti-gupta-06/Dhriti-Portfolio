import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { projectCategories, projects } from '../data/projects.js';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [-40, 50]);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        projectCategories.map((c) => [
          c.id,
          c.id === 'all' ? projects.length : projects.filter((p) => p.categories.includes(c.id)).length,
        ]),
      ),
    [],
  );

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  );
  const activeLabel = projectCategories.find((c) => c.id === filter)?.label;

  return (
    <section ref={sectionRef} id="projects" aria-labelledby="projects-title" className="relative border-t border-line py-20 md:py-28 overflow-hidden">
      {/* Background ambient glow responding to scroll */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-32 size-[32rem] rounded-full blur-3xl opacity-50"
        style={{
          background: 'radial-gradient(circle, var(--glow), transparent 70%)',
          y: shouldReduceMotion ? 0 : glowY,
        }}
      />
      <div className="container-page">
        <SectionHeading index="03" eyebrow="Projects" id="projects-title" title={<>Selected <em>work.</em></>}>
          Each project links to its source code, a live deployment where one exists, and a case study describing
          what it does and what I built.
        </SectionHeading>

        <div role="group" aria-label="Filter projects by technology" className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {projectCategories.map((c) => {
            const active = filter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(c.id)}
                disabled={counts[c.id] === 0}
                className={`relative inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition-colors ${
                  active ? 'border-transparent text-accent-ink' : 'border-line text-muted hover:border-line-strong hover:text-ink'
                }`}
              >
                {active && (
                  <motion.span layoutId="filter-pill" className="absolute inset-0 -z-0 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                )}
                <span className="relative">{c.label}</span>
                <span className={`relative font-mono text-[11px] ${active ? 'opacity-80' : 'opacity-70'}`}>{counts[c.id]}</span>
              </button>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
          {filter !== 'all' ? ` in ${activeLabel}` : ''}.
        </p>

        {visible.length === 0 ? (
          <div className="card grid place-items-center p-12 text-center">
            <p className="font-serif text-2xl">Nothing here yet.</p>
            <p className="mt-2 text-muted">No projects match “{activeLabel}”.</p>
            <button type="button" className="btn-ghost mt-6" onClick={() => setFilter('all')}>
              Show all projects
            </button>
          </div>
        ) : (
          <motion.div layout className="grid gap-5 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={projects.indexOf(p)} appearIndex={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
