import { resumeDownloadUrl } from '../services/api.js';
import { DownloadIcon } from './Icons.jsx';

/**
 * Plain links to the Express download routes. The server responds with
 * Content-Disposition: attachment, so the browser saves the file directly.
 */
export default function ResumeButtons({ variant = 'both', className = '' }) {
  if (variant === 'cv') {
    return (
      <a href={resumeDownloadUrl('pdf')} className={`btn-primary ${className}`} download>
        <DownloadIcon size={16} /> Download CV
      </a>
    );
  }
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={resumeDownloadUrl('pdf')} className="btn-primary" download>
        <DownloadIcon size={16} /> Resume (PDF)
      </a>
      <a href={resumeDownloadUrl('docx')} className="btn-ghost" download>
        <DownloadIcon size={16} /> Resume (Word)
      </a>
    </div>
  );
}
