import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from '../components/Icons.jsx';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found — Dhriti Gupta';
  }, []);

  return (
    <section className="grid min-h-[80vh] place-items-center pt-24 pb-16" aria-labelledby="nf-title">
      <div className="container-page text-center">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 id="nf-title" className="mt-4 font-serif text-5xl sm:text-7xl">
          This page <em>doesn&rsquo;t exist.</em>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-muted">The link may be out of date, or the address may have a typo.</p>
        <Link to="/" className="btn-primary mt-8">
          <ArrowLeft size={16} /> Back to the homepage
        </Link>
      </div>
    </section>
  );
}
