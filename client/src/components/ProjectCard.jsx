import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TechBadge from './TechBadge.jsx';
import { ArrowRight, ArrowUpRight, GithubIcon } from './Icons.jsx';

export default function ProjectCard({ project, index, appearIndex = 0 }) {
  const visibleStack = project.stack.slice(0, 6);
  const hidden = project.stack.length - visibleStack.length;
  const headingId = `project-${project.slug}-title`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, delay: (appearIndex % 2) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby={headingId}
      className="card group relative flex h-full flex-col p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-card focus-within:border-line-strong sm:p-7"
    >
      {/* Accent rule that grows on hover */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-6 h-px w-10 bg-accent transition-[width] duration-500 group-hover:w-[calc(100%-3rem)] sm:left-7"
      />

      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')}</span>
        {project.live && <span className="chip border-accent/40 text-accent">Live</span>}
      </div>

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
