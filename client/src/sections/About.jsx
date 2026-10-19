import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '../components/SectionHeading.jsx';
import { profile } from '../data/profile.js';
import { PinIcon } from '../components/Icons.jsx';

export default function About() {
  const sectionRef = useRef(null);
  const factsRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: factsProgress } = useScroll({
    target: factsRef,
    offset: ['start end', 'start 0.72'],
  });

  // Photo parallax & entrance transforms
  const photoY = useTransform(sectionProgress, [0, 1], [25, -25]);
  const photoScale = useTransform(sectionProgress, [0.05, 0.45], [0.96, 1]);
  const photoOpacity = useTransform(sectionProgress, [0.05, 0.35], [0.25, 1]);
  const glowY = useTransform(sectionProgress, [0, 1], [-20, 35]);

  // Bio entrance transforms
  const bioY = useTransform(sectionProgress, [0.1, 0.45], [26, 0]);
  const bioOpacity = useTransform(sectionProgress, [0.1, 0.45], [0.2, 1]);

  // Facts grid entrance transforms
  const factsY = useTransform(factsProgress, [0, 1], [24, 0]);
  const factsOpacity = useTransform(factsProgress, [0, 1], [0.25, 1]);

  return (
    <section ref={sectionRef} id="about" aria-labelledby="about-title" className="relative py-20 md:py-28 overflow-hidden">
      <div className="container-page">
        <SectionHeading index="01" eyebrow="About" id="about-title" title={<>Engineering student, <em>product builder.</em></>} />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16">
          <motion.div
            style={shouldReduceMotion ? undefined : { y: photoY, scale: photoScale, opacity: photoOpacity }}
            className="relative mx-auto w-full max-w-sm lg:mx-0"
          >
            {/* Ambient decorative glow behind portrait */}
            <motion.div
              aria-hidden="true"
              style={{
                y: shouldReduceMotion ? 0 : glowY,
                background: 'radial-gradient(circle, var(--glow), transparent 70%)',
              }}
              className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl blur-2xl opacity-75"
            />
            <figure className="relative">
              <div className="card overflow-hidden p-2 shadow-card">
                <picture>
                  <source srcSet={profile.photo.src} type="image/webp" />
                  <img
                    src={profile.photo.fallback}
                    alt={profile.photo.alt}
                    width="720"
                    height="720"
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full rounded-xl object-cover"
                  />
                </picture>
              </div>
              <figcaption className="mt-4 flex items-center justify-between gap-3 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                  <PinIcon size={15} /> {profile.location}
                </span>
                <span className="font-mono text-xs">3rd year · CSE</span>
              </figcaption>
            </figure>
          </motion.div>

          <div>
            <motion.div
              style={shouldReduceMotion ? undefined : { y: bioY, opacity: bioOpacity }}
              className="space-y-5 text-lg leading-relaxed text-pretty"
            >
              {profile.bio.map((para, i) => (
                <p key={i} className={i === 0 ? '' : 'text-muted'}>
                  {para}
                </p>
              ))}
            </motion.div>

            <motion.div
              ref={factsRef}
              style={shouldReduceMotion ? undefined : { y: factsY, opacity: factsOpacity }}
            >
              <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {profile.quickFacts.map((f) => (
                  <div key={f.label} className="bg-surface p-5">
                    <dt className="eyebrow">{f.label}</dt>
                    <dd className="mt-2 font-medium">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-sm text-muted">
                <span className="font-medium text-ink">Current status:</span> {profile.status}.{' '}
                {profile.availability}.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
