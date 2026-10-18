import { motion } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { BriefcaseIcon, CapIcon } from '../components/Icons.jsx';
import { timeline } from '../data/timeline.js';

const TYPE = {
  education: { label: 'Education', Icon: CapIcon, color: 'text-edu', ring: 'border-edu/50 bg-edu-soft' },
  experience: { label: 'Experience', Icon: BriefcaseIcon, color: 'text-accent', ring: 'border-accent/50 bg-accent-soft' },
};

export default function Experience() {
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

        <ol className="relative">
          {/* The line draws itself as the section scrolls into view */}
          <motion.span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[19px] w-px origin-top bg-line-strong md:left-[calc(11rem+19px)]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          {timeline.map((entry, i) => {
            const t = TYPE[entry.type];
            return (
              <Reveal as="li" key={entry.id} delay={i * 0.08} className="relative grid gap-2 pb-12 pl-14 last:pb-0 md:grid-cols-[11rem_1fr] md:gap-0 md:pl-0">
                <p className="font-mono text-xs leading-10 text-muted md:pr-8 md:text-right">{entry.period}</p>

                <div className="md:pl-14">
                  <span className={`absolute top-0 left-0 grid size-10 place-items-center rounded-full border ${t.ring} ${t.color} bg-bg md:left-44`}>
                    <t.Icon size={17} />
                  </span>
                  <div className="card p-6 transition-colors hover:border-line-strong">
                    <p className={`eyebrow ${t.color}`}>{t.label}</p>
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
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
