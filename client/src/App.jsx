import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import NotFound from './pages/NotFound.jsx';

/** Scrolls to #hash targets after navigation, or to the top for new pages. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section is rendered after a route change.
      const id = decodeURIComponent(hash.slice(1));
      const raf = requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ block: 'start' });
          // Move focus for keyboard and screen-reader users without a second jump.
          el.setAttribute('tabindex', '-1');
          el.focus({ preventScroll: true });
        }
      });
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash, key]);

  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="page-shell grain flex min-h-dvh flex-col overflow-x-clip">
        <ScrollManager />
        <Navbar />
        <main id="main" className="flex-1 outline-none" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
