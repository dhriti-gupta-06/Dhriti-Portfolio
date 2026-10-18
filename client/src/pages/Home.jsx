import { useEffect } from 'react';
import Hero from '../sections/Hero.jsx';
import About from '../sections/About.jsx';
import Skills from '../sections/Skills.jsx';
import Projects from '../sections/Projects.jsx';
import Experience from '../sections/Experience.jsx';
import Achievements from '../sections/Achievements.jsx';
import Resume from '../sections/Resume.jsx';
import Contact from '../sections/Contact.jsx';
import { profile } from '../data/profile.js';

export default function Home() {
  useEffect(() => {
    document.title = `${profile.name} — Software Engineer · Full-Stack · AI/ML`;
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Resume />
      <Contact />
    </>
  );
}
