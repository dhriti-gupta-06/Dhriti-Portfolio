import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { profile } from '../data/profile.js';
import { PinIcon } from '../components/Icons.jsx';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading index="01" eyebrow="About" id="about-title" title={<>Engineering student, <em>product builder.</em></>} />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16">
          <Reveal className="mx-auto w-full max-w-sm lg:mx-0">
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
          </Reveal>

          <div>
            <Reveal delay={0.05} className="space-y-5 text-lg leading-relaxed text-pretty">
              {profile.bio.map((para, i) => (
                <p key={i} className={i === 0 ? '' : 'text-muted'}>
                  {para}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.12}>
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
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
