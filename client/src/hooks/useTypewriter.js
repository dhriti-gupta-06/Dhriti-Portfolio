import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Types and deletes each phrase in turn. With reduced motion the first phrase
 * is returned in full and nothing animates.
 */
export function useTypewriter(phrases, { typeMs = 65, deleteMs = 35, holdMs = 1800 } = {}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion || phrases.length === 0) return undefined;
    const current = phrases[index % phrases.length];

    let delay = deleting ? deleteMs : typeMs;
    if (!deleting && text === current) delay = holdMs;
    if (deleting && text === '') delay = 300;

    const timer = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      } else {
        setText(current.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, index, phrases, reduceMotion, typeMs, deleteMs, holdMs]);

  return reduceMotion ? phrases[0] ?? '' : text;
}
