import React from 'react';
import Hero from './Components/Hero';
import Navigation from './Components/Navigation';
import Experience from './Components/Experience';
import Work from './Components/Work';
import About from './Components/About';
import Contact from './Components/Contact';
import Social from './Components/Social';
import StructuredData from './Components/StructuredData';
import resumeData from './resumeData.json';

export default function App() {
  const { main, resume, portfolio } = resumeData;
  return (
    <>
      <StructuredData data={resumeData} />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation name={main.name} />
      <main id="main-content" className="page-layout" tabIndex={-1}>
        <Hero data={main} />
        <div className="main-column">
          <header className="page-intro">
            <p className="eyebrow">{main.profileLabel}</p>
            <h2>{main.intro}</h2>
            <p>{main.introDetail}</p>
          </header>
          <Experience work={resume.work} education={resume.education} />
          <Work data={portfolio} />
          <About data={main} skills={resume.skills} />
          <Contact data={main} />
        </div>
      </main>
      <Social data={main} />
    </>
  );
}
