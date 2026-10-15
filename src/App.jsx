import React from 'react';
import Header from './Components/Header';
import Hero from './Components/Hero';
import About from './Components/About';
import Experience from './Components/Experience';
import Showcase from './Components/Showcase';
import Ornament from './Components/Ornament';
import Footer from './Components/Footer';
import StructuredData from './Components/StructuredData';
import resumeData from './resumeData.json';

function App() {
  const { main, resume, portfolio = {} } = resumeData;
  const showcase = portfolio.showcase || {};

  return (
    <div className="page">
      <StructuredData data={resumeData} />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Header main={main} />
      <main id="main-content">
        <Hero main={main} />
        <About main={main} />
        <Ornament />
        <Experience work={resume.work} />
        <Ornament />
        <Showcase id="work" title="Built at Work" items={showcase.work} />
        <Ornament />
        <Showcase id="home" title="Tinkering at Home" items={showcase.home} notes={portfolio.fieldNotes} />
      </main>
      <Footer main={main} />
    </div>
  );
}

export default App;
