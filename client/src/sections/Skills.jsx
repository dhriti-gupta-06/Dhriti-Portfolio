import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import SkillBar from '../components/SkillBar.jsx';
import { skillGroups } from '../data/skills.js';

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t border-line py-20 md:py-28">
      <div className="container-page">
        <SectionHeading index="02" eyebrow="Skills" id="skills-title" title={<>The toolkit I <em>actually</em> use.</>}>
          Grouped by area. Bars are my own self-assessment, not test scores; hover or focus a skill for context.
        </SectionHeading>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <SkillGroup key={group.id} group={group} delay={(gi % 3) * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Bars animate together once their card is a third visible. */
function SkillGroup({ group, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <Reveal delay={delay} className="card flex flex-col p-6">
      <h3 className="text-lg font-semibold tracking-tight">{group.title}</h3>
      <p className="mt-1 text-sm text-muted">{group.blurb}</p>
      <ul ref={ref} className="mt-6 space-y-5">
        {group.skills.map((s, si) => (
          <SkillBar key={s.name} {...s} delay={delay + si * 0.07} inView={inView} />
        ))}
      </ul>
    </Reveal>
  );
}
