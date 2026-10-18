import { useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { AlertIcon, CheckIcon, GithubIcon, LinkedinIcon, MailIcon, PinIcon } from '../components/Icons.jsx';
import { profile } from '../data/profile.js';
import { submitContact } from '../services/api.js';
import { CONTACT_LIMITS, validateContactForm } from '../utils/validateContact.js';

const EMPTY = { name: '', email: '', message: '' };

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverMessage, setServerMessage] = useState('');
  const inFlight = useRef(false);
  const formRef = useRef(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setErrors(validateContactForm(next));
    if (status === 'success' || status === 'error') setStatus('idle');
  };

  const onBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    setErrors(validateContactForm(values));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (inFlight.current) return; // guards against double submits

    const found = validateContactForm(values);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(found).length) {
      formRef.current?.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    inFlight.current = true;
    setStatus('submitting');
    setServerMessage('');
    try {
      const res = await submitContact({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      });
      // Only reached after the API confirmed the message was stored.
      setStatus('success');
      setServerMessage(res.message);
      setValues(EMPTY);
      setTouched({});
      setErrors({});
    } catch (err) {
      setStatus('error');
      setServerMessage(err.message);
      if (err.fieldErrors && Object.keys(err.fieldErrors).length) setErrors(err.fieldErrors);
    } finally {
      inFlight.current = false;
    }
  };

  const submitting = status === 'submitting';

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-20 md:py-28">
      <div className="container-page">
        <SectionHeading index="07" eyebrow="Contact" id="contact-title" title={<>Let&rsquo;s build <em>something.</em></>}>
          Internship opportunities, collaboration ideas or questions about a project. Send a message here and
          I&rsquo;ll reply by email.
        </SectionHeading>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal className="space-y-4">
            <ContactRow icon={<MailIcon />} label="Email" href={`mailto:${profile.email}`} value={profile.email} />
            <ContactRow icon={<LinkedinIcon />} label="LinkedIn" href={profile.socials.linkedin} value="Dhriti Gupta" external />
            <ContactRow icon={<GithubIcon />} label="GitHub" href={profile.socials.github} value="dhriti-gupta-06" external />
            <ContactRow icon={<PinIcon />} label="Based in" href={profile.mapsUrl} value={profile.location} external />
          </Reveal>

          <Reveal delay={0.08}>
            <form ref={formRef} noValidate onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8" aria-busy={submitting}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" autoComplete="name" value={values.name} error={touched.name && errors.name} onChange={onChange} onBlur={onBlur} maxLength={CONTACT_LIMITS.name.max} disabled={submitting} />
                <Field label="Email" name="email" type="email" autoComplete="email" inputMode="email" value={values.email} error={touched.email && errors.email} onChange={onChange} onBlur={onBlur} maxLength={CONTACT_LIMITS.email.max} disabled={submitting} />
              </div>
              <Field
                label="Message"
                name="message"
                multiline
                value={values.message}
                error={touched.message && errors.message}
                onChange={onChange}
                onBlur={onBlur}
                maxLength={CONTACT_LIMITS.message.max}
                disabled={submitting}
                hint={`${values.message.trim().length}/${CONTACT_LIMITS.message.max}`}
              />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted">Your details are only used to reply to you.</p>
                <button type="submit" className="btn-primary min-w-40" disabled={submitting}>
                  {submitting ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    'Send message'
                  )}
                </button>
              </div>

              <div aria-live="polite" role="status">
                <AnimatePresence mode="wait">
                  {(status === 'success' || status === 'error') && (
                    <motion.p
                      key={status}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex items-start gap-2 rounded-xl border p-4 text-sm ${
                        status === 'success' ? 'border-edu/40 bg-edu-soft text-ink' : 'border-red-500/40 bg-red-500/10 text-ink'
                      }`}
                    >
                      {status === 'success' ? <CheckIcon className="mt-0.5 shrink-0 text-edu" /> : <AlertIcon className="mt-0.5 shrink-0 text-red-500" />}
                      <span>{serverMessage}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, multiline = false, error, hint, ...props }) {
  const id = useId();
  const errorId = `${id}-error`;
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium">
          {label} <span className="text-accent" aria-hidden="true">*</span>
        </label>
        {hint && <span className="font-mono text-[11px] text-muted">{hint}</span>}
      </div>
      <Tag
        id={id}
        name={name}
        required
        aria-required="true"
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        rows={multiline ? 6 : undefined}
        className={`mt-2 block w-full rounded-xl border bg-bg px-4 py-3 text-base text-ink transition-colors placeholder:text-muted/70 focus:outline-none focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-60 ${
          multiline ? 'resize-y' : 'min-h-12'
        } ${error ? 'border-red-500/70' : 'border-line hover:border-line-strong focus:border-accent'}`}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
          <AlertIcon size={14} /> {error}
        </p>
      )}
    </div>
  );
}

function ContactRow({ icon, label, value, href, external }) {
  const content = (
    <>
      <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-accent transition-colors group-hover:border-accent">{icon}</span>
      <span className="min-w-0">
        <span className="eyebrow block">{label}</span>
        <span className="mt-0.5 block truncate font-medium">{value}</span>
      </span>
    </>
  );
  if (!href) return <div className="flex items-center gap-4">{content}</div>;
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-xl"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}
