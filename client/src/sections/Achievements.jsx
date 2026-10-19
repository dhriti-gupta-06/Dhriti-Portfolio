import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';
import { ArrowUpRight, AwardIcon } from '../components/Icons.jsx';
import { achievements } from '../data/achievements.js';

export default function Achievements() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const honors = achievements.filter((a) => a.kind !== 'Certification' && a.kind !== 'Workshop');
  const certs = achievements.filter((a) => a.kind === 'Certification' || a.kind === 'Workshop');

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const glowY = useTransform(sectionProgress, [0, 1], [-30, 40]);

  return (
    <section ref={sectionRef} id="achievements" aria-labelledby="achievements-title" className="relative border-t border-line py-20 md:py-28 overflow-hidden">
      {/* Background ambient glow responding to scroll */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-24 size-[28rem] rounded-full blur-3xl opacity-50"
        style={{
          background: 'radial-gradient(circle, var(--glow), transparent 70%)',
          y: shouldReduceMotion ? 0 : glowY,
        }}
      />
      <div className="container-page">
        <SectionHeading index="05" eyebrow="Achievements & Certifications" id="achievements-title" title={<>Recognition &amp; <em>learning.</em></>} />

        <ul className="grid gap-5 sm:grid-cols-2">
          {honors.map((a, i) => (
            <HonorCard key={a.id} item={a} index={i} />
          ))}
        </ul>

        <div className="mt-14">
          <h3 className="eyebrow">Certifications &amp; workshops</h3>
        </div>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {certs.map((c, i) => (
            <CertRow key={c.id} cert={c} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function HonorCard({ item, index }) {
  const cardRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start 0.68'],
  });

  const isOdd = index % 2 === 1;
  const y = useTransform(scrollYProgress, [0, 1], [isOdd ? 42 : 24, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  const badgeScale = useTransform(scrollYProgress, [0.1, 0.9], [0.75, 1]);
  const badgeRotate = useTransform(scrollYProgress, [0.1, 0.9], [-8, 0]);

  return (
    <motion.li
      ref={cardRef}
      style={shouldReduceMotion ? undefined : { y, opacity }}
      className="card group flex gap-5 p-6 shadow-card transition-[border-color,box-shadow,transform,translate] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-card focus-within:border-line-strong"
    >
      <motion.span
        style={shouldReduceMotion ? undefined : { scale: badgeScale, rotate: badgeRotate }}
        className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent"
      >
        <AwardIcon size={19} />
      </motion.span>
      <div className="min-w-0">
        <p className="eyebrow">{item.kind}</p>
        <h3 className="mt-1.5 text-lg leading-snug font-semibold tracking-tight">{item.title}</h3>
        <p className="mt-1 text-sm text-muted">
          {[item.issuer, item.date].filter(Boolean).join(' · ')}
        </p>
        {item.description && <p className="mt-3 text-[15px]">{item.description}</p>}
        <CredentialLink item={item} />
      </div>
    </motion.li>
  );
}

function CertRow({ cert, index = 0 }) {
  const rowRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'start 0.82'],
  });

  const startThreshold = Math.min(index * 0.05, 0.3);
  const x = useTransform(scrollYProgress, [startThreshold, 1], [18, 0]);
  const opacity = useTransform(scrollYProgress, [startThreshold, 1], [0.25, 1]);

  return (
    <motion.li
      ref={rowRef}
      style={shouldReduceMotion ? undefined : { x, opacity }}
      className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-4">
        {cert.image && <img src={cert.image} alt={`${cert.title} certificate`} loading="lazy" className="h-12 w-16 rounded border border-line object-cover" />}
        <div>
          <p className="font-medium">{cert.title}</p>
          {(cert.issuer || cert.date) && <p className="text-sm text-muted">{[cert.issuer, cert.date].filter(Boolean).join(' · ')}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="chip">{cert.kind}</span>
        <CredentialLink item={cert} compact />
      </div>
    </motion.li>
  );
}


function CredentialLink({ item, compact = false }) {
  // Prefer a public verification page. Fall back to a local certificate image
  // when that is all that exists — never present a local file as an official issuer link.
  const href = item.url || item.image;
  if (!href) return null;
  const label = item.url ? 'Verify credential' : 'Verify Certificate';
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-sm text-accent link-underline ${compact ? '' : 'mt-3'}`}
    >
      {label} <ArrowUpRight size={14} />
      <span className="sr-only">for {item.title} (opens in a new tab)</span>
    </a>
  );
}
