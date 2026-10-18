import Reveal from '../components/Reveal.jsx';
import ResumeButtons from '../components/ResumeButtons.jsx';
import { FileIcon } from '../components/Icons.jsx';

export default function Resume() {
  return (
    <section id="resume" aria-labelledby="resume-title" className="border-t border-line py-20 md:py-28">
      <div className="container-page">
        <Reveal className="card relative overflow-hidden p-8 sm:p-12">
          <div
            aria-hidden="true"
            className="absolute -right-24 -bottom-24 size-80 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, var(--glow), transparent 70%)' }}
          />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="eyebrow flex items-center gap-3">
                <span className="text-accent">06</span>
                <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
                Resume
              </p>
              <h2 id="resume-title" className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                The one-page <em>version.</em>
              </h2>
              <p className="mt-4 max-w-xl text-muted">
                Education, experience, projects and achievements on a single page. Download it as a PDF, or as a Word
                document if your applicant system prefers .docx.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <span className="hidden size-14 place-items-center rounded-2xl border border-line text-accent md:grid">
                <FileIcon size={24} />
              </span>
              <ResumeButtons />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
