import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * Continuous scroll-linked reveal component.
 * Progresses smoothly on scroll down and reverses cleanly on scroll up.
 * Supports prefers-reduced-motion by rendering statically without motion.
 */
export default function Reveal({
  as = 'div',
  delay = 0,
  y = 22,
  offset = ['start end', 'start 0.72'],
  immediate = false,
  className,
  style = {},
  children,
  ...rest
}) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  // Map delay into a scroll-distance stagger threshold
  const startProgress = Math.min(Math.max(delay * 1.6, 0), 0.35);
  const opacity = useTransform(scrollYProgress, [startProgress, 1], [0.2, 1]);
  const translateY = useTransform(scrollYProgress, [startProgress, 1], [y, 0]);

  const Component = motion[as] ?? motion.div;

  if (immediate || shouldReduceMotion) {
    return (
      <Component className={className} style={style} {...rest}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity,
        y: translateY,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}

