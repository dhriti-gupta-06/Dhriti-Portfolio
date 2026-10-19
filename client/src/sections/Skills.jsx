import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';
import SkillBar from '../components/SkillBar.jsx';
import { skillGroups } from '../data/skills.js';

export default function Skills() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const glowY = useTransform(sectionProgress, [0, 1], [-30, 40]);

  return (
    <section ref={sectionRef} id="skills" aria-labelledby="skills-title" className="relative border-t border-line py-20 md:py-28 overflow-hidden">
      {/* Background ambient glow drifting on scroll */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -right-32 size-96 rounded-full blur-3xl opacity-60"
        style={{
          background: 'radial-gradient(circle, var(--glow), transparent 70%)',
          y: shouldReduceMotion ? 0 : glowY,
        }}
      />
      <div className="container-page">
        <SectionHeading index="02" eyebrow="Skills" id="skills-title" title={<>The toolkit I <em>actually</em> use.</>}>
          Grouped by area. Bars are my own self-assessment, not test scores; hover or focus a skill for context.
        </SectionHeading>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <SkillGroup key={group.id} group={group} index={gi} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Card and its skill bars animate continuously with scroll progress. */
function SkillGroup({ group, index }) {
  const cardRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start 0.65'],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [30 + (index % 3) * 10, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={shouldReduceMotion ? undefined : { y: cardY, opacity: cardOpacity }}
      className="card flex flex-col p-6 shadow-card transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-card"
    >
      <h3 className="text-lg font-semibold tracking-tight">{group.title}</h3>
      <p className="mt-1 text-sm text-muted">{group.blurb}</p>
      <ul className="mt-6 space-y-5">
        {group.skills.map((s, si) => (
          <SkillBar key={s.name} {...s} index={si} groupProgress={scrollYProgress} />
        ))}
      </ul>
    </motion.div>
  );
}

