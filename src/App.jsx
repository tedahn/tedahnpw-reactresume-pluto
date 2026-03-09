import React, { useState, useEffect } from 'react';
import About from './Components/About';
import Experience from './Components/Experience';
import Work from './Components/Work';
import Contact from './Components/Contact';
import Social from './Components/Social';
import AnimatedSection from './Components/AnimatedSection';
import Navigation from './Components/Navigation';
import Hero from './Components/Hero';
import resumeData from './resumeData.json';

function App() {
  const [activeSection, setActiveSection] = useState('home'); // Default to first section

  useEffect(() => {
    // Simple scroll spy logic
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'work', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust offset to account for navbar height (~70px)
          if (rect.top >= -100 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Run once on mount to set initial state correctly
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!resumeData || !resumeData.main || !resumeData.resume) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  return (
    <div className="App">
      <Navigation activeSection={activeSection} name={resumeData.main.name} />

      <Hero data={resumeData.main} />

      <AnimatedSection id="about" transition="wipe-left">
        <About data={resumeData.main} skills={resumeData.resume.skills} />
      </AnimatedSection>

      <AnimatedSection id="experience" transition="fade-up">
        <Experience work={resumeData.resume.work} education={resumeData.resume.education} />
      </AnimatedSection>

      <AnimatedSection id="work" transition="scale-in">
        <Work data={resumeData.portfolio} />
      </AnimatedSection>

      <AnimatedSection id="contact" transition="fade-in">
        <Contact data={resumeData.main} />
      </AnimatedSection>

      <Social data={resumeData.main} />
    </div>
  );
}

export default App;
