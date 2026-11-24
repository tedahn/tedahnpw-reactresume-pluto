import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import Hero from './Components/Hero';
import About from './Components/About';
import Experience from './Components/Experience';
import Patents from './Components/Patents';
import Showcase from './Components/Showcase';
import Ornament from './Components/Ornament';
import Footer from './Components/Footer';
import StructuredData from './Components/StructuredData';
import resumeData from './resumeData.json';
import { STORAGE_KEY, detectLang, localize, uiText } from './lib/i18n';

const readSaved = () => {
  try { return window.localStorage.getItem(STORAGE_KEY); } catch { return null; }
};

const initialLang = () => (typeof window === 'undefined' ? 'en' : detectLang({
  search: window.location.search,
  saved: readSaved(),
  languages: navigator.languages?.length ? navigator.languages : [navigator.language],
}));

function App() {
  const [lang, setLang] = useState(initialLang);
  const data = localize(resumeData, lang);
  const t = uiText(resumeData, lang);
  const { main, resume, portfolio = {} } = data;
  const showcase = portfolio.showcase || {};

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.title || document.title;
  }, [lang, t.title]);

  const chooseLang = (next) => {
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch { /* private mode */ }
    setLang(next);
  };

  return (
    <div className="page">
      <StructuredData data={resumeData} />
      <a href="#main-content" className="skip-link">{t.skip}</a>
      <Header main={main} t={t} lang={lang} onLang={chooseLang} />
      <main id="main-content">
        <Hero main={main} t={t} />
        <About main={main} t={t} />
        <Ornament />
        <Experience work={resume.work} t={t} />
        <Patents patents={resume.patents} self={main.legalname} t={t} />
        <Ornament />
        <Showcase id="work" title={t.professionalProjects} items={showcase.work} t={t} />
        <Ornament />
        <Showcase id="home" title={t.independentProjects} items={showcase.home} notes={portfolio.fieldNotes} t={t} />
      </main>
      <Footer main={main} t={t} />
    </div>
  );
}

export default App;
