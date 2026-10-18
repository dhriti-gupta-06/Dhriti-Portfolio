import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { ArrowUpRight, AwardIcon } from '../components/Icons.jsx';
import { achievements } from '../data/achievements.js';

export default function Achievements() {
  const honors = achievements.filter((a) => a.kind !== 'Certification' && a.kind !== 'Workshop');
  const certs = achievements.filter((a) => a.kind === 'Certification' || a.kind === 'Workshop');

  return (
    <section id="achievements" aria-labelledby="achievements-title" className="border-t border-line py-20 md:py-28">
      <div className="container-page">
        <SectionHeading index="05" eyebrow="Achievements & Certifications" id="achievements-title" title={<>Recognition &amp; <em>learning.</em></>} />

        <ul className="grid gap-5 sm:grid-cols-2">
          {honors.map((a, i) => (
            <Reveal as="li" key={a.id} delay={(i % 2) * 0.06} className="card group flex gap-5 p-6 transition-colors hover:border-line-strong">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                <AwardIcon size={19} />
              </span>
              <div className="min-w-0">
                <p className="eyebrow">{a.kind}</p>
                <h3 className="mt-1.5 text-lg leading-snug font-semibold tracking-tight">{a.title}</h3>
                <p className="mt-1 text-sm text-muted">
                  {[a.issuer, a.date].filter(Boolean).join(' · ')}
                </p>
                {a.description && <p className="mt-3 text-[15px]">{a.description}</p>}
                <CredentialLink item={a} />
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12">
          <h3 className="eyebrow">Certifications &amp; workshops</h3>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {certs.map((c) => (
              <li key={c.id} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  {c.image && <img src={c.image} alt={`${c.title} certificate`} loading="lazy" className="h-12 w-16 rounded border border-line object-cover" />}
                  <div>
                    <p className="font-medium">{c.title}</p>
                    {(c.issuer || c.date) && <p className="text-sm text-muted">{[c.issuer, c.date].filter(Boolean).join(' · ')}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="chip">{c.kind}</span>
                  <CredentialLink item={c} compact />
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function CredentialLink({ item, compact = false }) {
  if (!item.url) return null;
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-sm text-accent link-underline ${compact ? '' : 'mt-3'}`}
    >
      Verify credential <ArrowUpRight size={14} />
      <span className="sr-only">for {item.title} (opens in a new tab)</span>
    </a>
  );
}
