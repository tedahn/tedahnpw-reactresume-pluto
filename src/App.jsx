import React, { useState, useEffect } from 'react';
import About from './Components/About';
import Experience from './Components/Experience';
import Work from './Components/Work';
import Contact from './Components/Contact';
import Social from './Components/Social';
import ParticleBackground from './Components/ParticleBackground';
import AnimatedSection from './Components/AnimatedSection';
import Navigation from './Components/Navigation';
import resumeData from './resumeData.json';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Simple scroll spy logic
    const handleScroll = () => {
      const sections = ['about', 'experience', 'work', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!resumeData || !resumeData.main || !resumeData.resume) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  return (
    <div className="App">
      <ParticleBackground />
      <Navigation activeSection={activeSection} />

      <AnimatedSection id="about" className="section home">
        <About data={resumeData.main} />
      </AnimatedSection>

      <AnimatedSection id="experience" className="section">
        <Experience work={resumeData.resume.work} education={resumeData.resume.education} />
      </AnimatedSection>

      <AnimatedSection id="work" className="section">
        <Work data={resumeData.portfolio} />
      </AnimatedSection>

      <AnimatedSection id="contact" className="section">
        <Contact data={resumeData.main} />
      </AnimatedSection>

      <Social data={resumeData.main} />
    </div>
  );
}

export default App;
