import Reveal from './Reveal.jsx';

export default function SectionHeading({ index, eyebrow, title, id, children }) {
  return (
    <Reveal className="mb-10 max-w-3xl md:mb-14">
      <p className="eyebrow flex items-center gap-3">
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl">
        {title}
      </h2>
      {children && <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg">{children}</p>}
    </Reveal>
  );
}
