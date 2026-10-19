import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import TechBadge from './TechBadge.jsx';
import { ArrowRight, ArrowUpRight, GithubIcon } from './Icons.jsx';

export default function ProjectCard({ project, index, appearIndex = 0 }) {
  const cardRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const visibleStack = project.stack.slice(0, 6);
  const hidden = project.stack.length - visibleStack.length;
  const headingId = `project-${project.slug}-title`;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start 0.62'],
  });

  const isOddCol = appearIndex % 2 === 1;
  const entryY = useTransform(scrollYProgress, [0, 1], [isOddCol ? 46 : 28, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.9], ['14px', '40px']);

  return (
    <motion.article
      ref={cardRef}
      layout
      exit={{ opacity: 0, scale: 0.97 }}
      style={shouldReduceMotion ? undefined : { y: entryY, opacity: cardOpacity }}
      aria-labelledby={headingId}
      className="card group relative flex h-full flex-col p-6 transition-[border-color,box-shadow,transform,translate] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-card focus-within:border-line-strong sm:p-7"
    >
      {/* Accent rule that tracks scroll progress and expands further on hover */}
      <motion.span
        aria-hidden="true"
        style={{ width: shouldReduceMotion ? '2.5rem' : lineWidth }}
        className="absolute top-0 left-6 h-px bg-accent transition-[width] duration-500 group-hover:w-[calc(100%-3rem)] sm:left-7"
      />

      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')}</span>
        {project.live && <span className="chip border-accent/40 text-accent">Live</span>}
      </div>

      {project.image && (
        <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl border border-line bg-surface-2 transition-colors duration-300 group-hover:border-line-strong">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      )}

      <h3 id={headingId} className="mt-5 font-serif text-3xl leading-tight">
        {project.title}
      </h3>
      <p className="mt-1 text-sm text-muted">{project.subtitle}</p>

      <p className="mt-4 text-[15px] leading-relaxed">{project.summary}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
        {visibleStack.map((t) => (
          <TechBadge key={t}>{t}</TechBadge>
        ))}
        {hidden > 0 && <li className="chip">+{hidden}</li>}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
        <Link to={`/projects/${project.slug}`} className="btn-primary min-h-10 px-4">
          Case study <ArrowRight size={16} />
          <span className="sr-only">: {project.title}</span>
        </Link>
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost min-h-10 px-4">
            <GithubIcon size={16} /> Code
            <span className="sr-only"> for {project.title} on GitHub (opens in a new tab)</span>
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-ghost min-h-10 px-4">
            Live demo <ArrowUpRight size={16} />
            <span className="sr-only"> of {project.title} (opens in a new tab)</span>
          </a>
        )}
      </div>
    </motion.article>
  );
}

