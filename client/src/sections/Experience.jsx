import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';
import { BriefcaseIcon, CapIcon } from '../components/Icons.jsx';
import { timeline } from '../data/timeline.js';

const TYPE = {
  education: { label: 'Education', Icon: CapIcon, color: 'text-edu', ring: 'border-edu/50 bg-edu-soft' },
  experience: { label: 'Experience', Icon: BriefcaseIcon, color: 'text-accent', ring: 'border-accent/50 bg-accent-soft' },
};

export default function Experience() {
  const listRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll progress directly links the vertical timeline line to scroll
  const { scrollYProgress: lineProgress } = useScroll({
    target: listRef,
    offset: ['start 0.75', 'end 0.65'],
  });

  const lineScaleY = useTransform(lineProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-line py-20 md:py-28">
      <div className="container-page">
        <SectionHeading index="04" eyebrow="Education & Experience" id="experience-title" title={<>Where I&rsquo;ve <em>learned</em> and worked.</>} />

        <div className="mb-8 flex flex-wrap gap-4 text-sm text-muted" aria-hidden="true">
          {Object.values(TYPE).map(({ label, Icon, color }) => (
            <span key={label} className="flex items-center gap-2">
              <Icon size={16} className={color} /> {label}
            </span>
          ))}
        </div>

        <ol ref={listRef} className="relative">
          {/* The line draws itself continuously on scroll down and reverses on scroll up */}
          <motion.span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[19px] w-px origin-top bg-line-strong md:left-[calc(11rem+19px)]"
            style={{
              scaleY: shouldReduceMotion ? 1 : lineScaleY,
              transformOrigin: 'top',
            }}
          />
          {timeline.map((entry, i) => (
            <TimelineItem key={entry.id} entry={entry} index={i} typeConfig={TYPE[entry.type]} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function TimelineItem({ entry, typeConfig }) {
  const itemRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start end', 'start 0.65'],
  });

  const nodeScale = useTransform(scrollYProgress, [0.1, 0.9], [0.65, 1]);
  const nodeOpacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 1]);
  const cardX = useTransform(scrollYProgress, [0.1, 0.9], [24, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.8], [0.2, 1]);

  return (
    <li ref={itemRef} className="relative grid gap-2 pb-12 pl-14 last:pb-0 md:grid-cols-[11rem_1fr] md:gap-0 md:pl-0">
      <p className="font-mono text-xs leading-10 text-muted md:pr-8 md:text-right">{entry.period}</p>

      <div className="md:pl-14">
        <motion.span
          style={shouldReduceMotion ? undefined : { scale: nodeScale, opacity: nodeOpacity }}
          className={`absolute top-0 left-0 grid size-10 place-items-center rounded-full border ${typeConfig.ring} ${typeConfig.color} bg-bg md:left-44`}
        >
          <typeConfig.Icon size={17} />
        </motion.span>
        <motion.div
          style={shouldReduceMotion ? undefined : { x: cardX, opacity: cardOpacity }}
          className="card p-6 transition-colors hover:border-line-strong"
        >
          <p className={`eyebrow ${typeConfig.color}`}>{typeConfig.label}</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">{entry.title}</h3>
          <p className="mt-1 text-muted">
            {entry.organization}
            {entry.location ? ` · ${entry.location}` : ''}
          </p>
          <ul className="mt-4 space-y-2 text-[15px] leading-relaxed">
            {entry.points.map((pt) => (
              <li key={pt} className="flex gap-3">
                <span aria-hidden="true" className={`mt-2.5 size-1 shrink-0 rounded-full ${entry.type === 'education' ? 'bg-edu' : 'bg-accent'}`} />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
          {entry.tags?.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Areas">
              {entry.tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </li>
  );
}

