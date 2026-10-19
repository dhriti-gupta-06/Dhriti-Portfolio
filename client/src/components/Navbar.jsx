import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import ThemeToggle from './ThemeToggle.jsx';
import { CloseIcon, MenuIcon } from './Icons.jsx';
import { profile } from '../data/profile.js';
import { useActiveSection } from '../hooks/useActiveSection.js';

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'resume', label: 'Resume' },
];
const SECTION_IDS = [...NAV_LINKS.map((l) => l.id), 'contact'];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const active = useActiveSection(pathname === '/' ? SECTION_IDS : []);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only rounded-md bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <nav className="container-page flex h-16 items-center justify-between gap-4" aria-label="Primary">
        <Link to="/" onClick={close} className="group flex items-center gap-3" aria-label={`${profile.name}, home`}>
          <span className="grid size-9 place-items-center rounded-full border border-line-strong font-serif text-lg italic transition-colors group-hover:border-accent group-hover:text-accent">
            dg
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:inline">{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <Link
                to={`/#${link.id}`}
                aria-current={active === link.id ? 'true' : undefined}
                className={`relative rounded-full px-3 py-2 text-sm transition-colors hover:text-ink ${
                  active === link.id ? 'text-ink' : 'text-muted'
                }`}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/#contact" className="btn-primary hidden sm:inline-flex">
            Let&rsquo;s talk
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <ul className="container-page flex flex-col py-3">
              {[...NAV_LINKS, { id: 'contact', label: 'Contact' }].map((link) => (
                <li key={link.id}>
                  <Link
                    to={`/#${link.id}`}
                    onClick={close}
                    className={`flex min-h-12 items-center justify-between border-b border-line text-lg ${
                      active === link.id ? 'text-accent' : 'text-ink'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-accent origin-left"
        style={{ scaleX: shouldReduceMotion ? 0 : progressScaleX }}
      />
    </header>
  );
}
