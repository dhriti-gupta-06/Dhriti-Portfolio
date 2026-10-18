import { motion } from 'framer-motion';

/**
 * Fades and lifts its children into view once, when scrolled into the viewport.
 * MotionConfig reducedMotion="user" (in App) turns this into a plain fade for
 * visitors who prefer reduced motion.
 */
export default function Reveal({ as = 'div', delay = 0, y = 18, immediate = false, className, children, ...rest }) {
  // immediate: animate on mount instead of on scroll (for content near the top of a page).
  const trigger = immediate
    ? { animate: { opacity: 1, y: 0 } }
    : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 } };
  const Component = motion[as] ?? motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      {...trigger}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
}
