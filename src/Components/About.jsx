import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const About = ({ data }) => {
  if (!data) return null;

  const { name, bio, image, email, phone, address } = data;
  const { street, city, state, zip } = address;

  return (
    <section id="about" className="container">
      <div className="section-title">
        <h2>About <span>Me</span></h2>
      </div>

      <div className="about-grid">
        <div className="profile-container">
          <img
            className="profile-pic"
            src={`images/${image}`}
            alt={`${name} Profile Pic`}
          />
        </div>
        <div className="about-content">
          <p>{bio}</p>
          <div className="contact-box">
            <h3 className="contact-name">{name}</h3>
            <div className="address">
              <div className="contact-row">
                <FontAwesomeIcon icon="map-marker-alt" className="contact-icon" />
                <span>{city} {state}, {zip}</span>
              </div>
              <div className="contact-row">
                <FontAwesomeIcon icon="phone" className="contact-icon" />
                <span>{phone}</span>
              </div>
              <div className="contact-row">
                <FontAwesomeIcon icon="envelope" className="contact-icon" />
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
