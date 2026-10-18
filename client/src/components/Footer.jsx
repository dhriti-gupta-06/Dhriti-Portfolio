import { Link } from 'react-router-dom';
import { profile } from '../data/profile.js';
import { GithubIcon, LinkedinIcon, MailIcon, PinIcon } from './Icons.jsx';
import { NAV_LINKS } from './Navbar.jsx';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_auto] md:items-start">
        <div>
          <p className="font-serif text-3xl">{profile.name}</p>
          <p className="mt-2 max-w-sm text-sm text-muted">
            {profile.status}. {profile.location}.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <Link to={`/#${l.id}`} className="text-muted transition-colors hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/#contact" className="text-muted transition-colors hover:text-ink">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <ul className="flex flex-wrap gap-2" aria-label="Social links">
          <li>
            <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent">
              <GithubIcon />
            </a>
          </li>
          <li>
            <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent">
              <LinkedinIcon />
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`} className="grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent">
              <MailIcon />
            </a>
          </li>
          <li>
            <a href={profile.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${profile.locationAddress} in Google Maps`} className="grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-accent hover:text-accent">
              <PinIcon />
            </a>
          </li>
        </ul>
      </div>
      <div className="container-page flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:justify-between">
        <p>© {year} {profile.name}. All rights reserved.</p>
        <p className="font-mono">Built with React, Express, MongoDB &amp; Node.js</p>
      </div>
    </footer>
  );
}
