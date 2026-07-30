import React, { Suspense } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SectionShapes from './SectionShapes';
const AboutScene3D = React.lazy(() =>
  import('./Scene3D').then((m) => ({ default: m.AboutScene3D }))
);

const About = ({ data, skills }) => {
  if (!data) return null;

  const { name, bio, image, email, phone, address } = data;
  const { city, state, zip } = address;

  const bioParagraphs = bio ? bio.split('\n\n') : [];

  return (
    <section id="about">
      <SectionShapes variant="about" />
      <Suspense fallback={null}><AboutScene3D /></Suspense>
      <div className="about-wrapper">
        <h2 className="about-watermark" aria-hidden="true">About</h2>

        <div className="about-layout">
          {/* Left Column — Pull Quote */}
          <div className="about-quote">
            <div className="about-quote-inner">
              {bioParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Right Column — Details */}
          <div className="about-details">
            {image && (
              <img
                className="about-photo"
                src={`images/${image}`}
                alt={`${name} Profile Pic`}
              />
            )}

            <h3 className="about-name">{name}</h3>

            {skills && skills.length > 0 && (
              <div className="about-skills">
                <span className="about-detail-label">Skills</span>
                <p className="about-skills-list">
                  {skills.map((skill) => skill.name).join(', ')}
                </p>
              </div>
            )}

            <div className="about-contact">
              <span className="about-detail-label">Contact</span>
              <ul className="about-contact-list">
                <li>
                  <FontAwesomeIcon icon="map-marker-alt" className="about-contact-icon" />
                  <span>{[city, state].filter(Boolean).join(', ')}{zip ? ` ${zip}` : ''}</span>
                </li>
                <li>
                  <FontAwesomeIcon icon="phone" className="about-contact-icon" />
                  <a href={`tel:${phone}`}>{phone}</a>
                </li>
                <li>
                  <FontAwesomeIcon icon="envelope" className="about-contact-icon" />
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
