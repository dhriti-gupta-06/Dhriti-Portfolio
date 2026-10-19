import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export default function SectionHeading({ index, eyebrow, title, id, children }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.72'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [26, 0]);
  const lineWidth = useTransform(scrollYProgress, [0.15, 0.85], ['0px', '2rem']);
  const indexScale = useTransform(scrollYProgress, [0.1, 0.85], [0.85, 1]);

  return (
    <motion.div
      ref={ref}
      style={shouldReduceMotion ? undefined : { opacity, y }}
      className="mb-10 max-w-3xl md:mb-14"
    >
      <p className="eyebrow flex items-center gap-3">
        <motion.span
          style={shouldReduceMotion ? undefined : { scale: indexScale }}
          className="text-accent origin-left"
        >
          {index}
        </motion.span>
        <motion.span
          style={{ width: shouldReduceMotion ? '2rem' : lineWidth }}
          className="h-px bg-line-strong"
          aria-hidden="true"
        />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl">
        {title}
      </h2>
      {children && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
          {children}
        </p>
      )}
    </motion.div>
  );
}

