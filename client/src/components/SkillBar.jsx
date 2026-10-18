import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { levelLabel } from '../data/skills.js';

/**
 * Animated self-assessed proficiency bar. The tooltip opens on hover AND on
 * keyboard focus, and the same information is in the accessible name, so
 * nothing depends on hover alone.
 */
export default function SkillBar({ name, level, note, delay = 0, inView = true }) {
  const [show, setShow] = useState(false);
  const tipId = useId();
  const label = levelLabel(level);

  return (
    <li
      className="group relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div
        tabIndex={0}
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={level}
        aria-valuetext={`${label}, self-assessed ${level} out of 100`}
        aria-label={name}
        aria-describedby={tipId}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="rounded-md outline-offset-4"
      >
        <div className="flex items-baseline justify-between gap-3 text-sm">
          <span className="font-medium">{name}</span>
          <span className="font-mono text-xs text-muted">{label}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
          <motion.div
            className="h-full origin-left rounded-full bg-accent transition-[filter] group-hover:brightness-110"
            style={{ width: `${level}%` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: inView ? 1 : 0 }}
            transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <div
        id={tipId}
        role="tooltip"
        className={`pointer-events-none absolute -top-2 right-0 z-10 w-max max-w-[16rem] -translate-y-full rounded-lg border border-line bg-surface px-3 py-2 text-xs shadow-card transition-[opacity,transform] duration-150 ${
          show ? 'opacity-100' : 'translate-y-[calc(-100%+4px)] opacity-0'
        }`}
      >
        <span className="font-mono text-accent">{level}/100</span>
        <span className="text-muted"> · self-assessed</span>
        {note && <span className="mt-0.5 block text-ink">{note}</span>}
      </div>
    </li>
  );
}
