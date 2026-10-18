import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import TechBadge from '../components/TechBadge.jsx';
import { AlertIcon, ArrowLeft, ArrowRight, ArrowUpRight, GithubIcon } from '../components/Icons.jsx';
import { getProject, projects } from '../data/projects.js';
import NotFound from './NotFound.jsx';

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    if (project) document.title = `${project.title} — Dhriti Gupta`;
  }, [project]);

  if (!project) return <NotFound />;

  const idx = projects.indexOf(project);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="pt-28 pb-20 sm:pt-36" aria-labelledby="project-title">
      <div className="container-page max-w-4xl">
        <Link to="/#projects" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-accent">
          <ArrowLeft size={16} /> All projects
        </Link>

        <Reveal immediate>
          <p className="eyebrow mt-8">Case study · {String(idx + 1).padStart(2, '0')}</p>
          <h1 id="project-title" className="mt-4 font-serif text-5xl leading-[1] tracking-tight sm:text-7xl">
            {project.title}
          </h1>
          <p className="mt-3 text-xl text-muted">{project.subtitle}</p>
          <p className="mt-8 text-lg leading-relaxed text-pretty sm:text-xl">{project.summary}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.repo ? (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <GithubIcon size={16} /> View source
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <span className="chip min-h-11 px-4 text-xs">Repository link coming soon</span>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Open live demo <ArrowUpRight size={16} />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
          {project.liveNote && <p className="mt-3 text-sm text-muted">{project.liveNote}</p>}
        </Reveal>

        <div className="mt-16 grid gap-12">
          <Block title="The problem" delay={0.10}>
            <p className="text-lg leading-relaxed text-pretty">{project.problem}</p>
          </Block>

          <Block title="What it does" delay={0.18}>
            <BulletList items={project.features} />
          </Block>

          <Block title="My contribution" delay={0.26}>
            <BulletList items={project.contribution} accent />
          </Block>

          <Block title="Tech stack" delay={0.34}>
            <ul className="flex flex-wrap gap-2" aria-label="Technologies">
              {project.stack.map((t) => (
                <TechBadge key={t}>{t}</TechBadge>
              ))}
            </ul>
          </Block>

          {project.disclaimer && (
            <Reveal immediate delay={0.42}>
              <p className="flex gap-3 rounded-2xl border border-line bg-surface-2 p-5 text-sm text-muted">
                <AlertIcon className="mt-0.5 shrink-0 text-accent" />
                {project.disclaimer}
              </p>
            </Reveal>
          )}
        </div>

        <nav aria-label="Next project" className="mt-20 border-t border-line pt-8">
          <Link to={`/projects/${next.slug}`} className="group flex items-center justify-between gap-6">
            <span>
              <span className="eyebrow block">Next project</span>
              <span className="mt-2 block font-serif text-3xl transition-colors group-hover:text-accent sm:text-4xl">{next.title}</span>
            </span>
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line transition-colors group-hover:border-accent group-hover:text-accent">
              <ArrowRight />
            </span>
          </Link>
        </nav>
      </div>
    </article>
  );
}

function Block({ title, delay = 0, children }) {
  return (
    <Reveal as="section" immediate delay={delay} className="grid gap-4 md:grid-cols-[12rem_1fr] md:gap-8">
      <h2 className="eyebrow pt-1">{title}</h2>
      <div>{children}</div>
    </Reveal>
  );
}

function BulletList({ items, accent = false }) {
  return (
    <ul className="space-y-3 text-[15px] leading-relaxed sm:text-base">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className={`mt-2.5 size-1.5 shrink-0 rounded-full ${accent ? 'bg-accent' : 'bg-line-strong'}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
