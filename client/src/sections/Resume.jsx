import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import ResumeButtons from '../components/ResumeButtons.jsx';
import { FileIcon } from '../components/Icons.jsx';

export default function Resume() {
  const cardRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center 0.65'],
  });

  const cardScale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const cardY = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 1]);
  const glowX = useTransform(scrollYProgress, [0, 1], [35, -20]);
  const glowY = useTransform(scrollYProgress, [0, 1], [35, -30]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const iconRotate = useTransform(scrollYProgress, [0.15, 0.9], [-10, 0]);

  return (
    <section id="resume" aria-labelledby="resume-title" className="border-t border-line py-20 md:py-28">
      <div className="container-page">
        <motion.div
          ref={cardRef}
          style={shouldReduceMotion ? undefined : { scale: cardScale, y: cardY, opacity: cardOpacity }}
          className="card relative overflow-hidden p-8 sm:p-12 shadow-card"
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -bottom-24 size-80 rounded-full blur-3xl opacity-75"
            style={{
              background: 'radial-gradient(circle, var(--glow), transparent 70%)',
              x: shouldReduceMotion ? 0 : glowX,
              y: shouldReduceMotion ? 0 : glowY,
              scale: shouldReduceMotion ? 1 : glowScale,
            }}
          />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="eyebrow flex items-center gap-3">
                <span className="text-accent">06</span>
                <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
                Resume
              </p>
              <h2 id="resume-title" className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                The one-page <em>version.</em>
              </h2>
              <p className="mt-4 max-w-xl text-muted">
                Education, experience, projects and achievements on a single page. Download it as a PDF, or as a Word
                document if your applicant system prefers .docx.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <motion.span
                style={shouldReduceMotion ? undefined : { rotate: iconRotate }}
                className="hidden size-14 place-items-center rounded-2xl border border-line text-accent md:grid"
              >
                <FileIcon size={24} />
              </motion.span>
              <ResumeButtons />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

