import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Contact = ({ data }) => {
  if (!data) return null;

  return (
    <section id="contact" className="container">
      <div className="section-title">
        <h2>Get In <span>Touch</span></h2>
      </div>

      <div className="contact-container">
        <p className="lead">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision!
        </p>

        <a href={`mailto:${data.email}`} className="cta-button">
          <FontAwesomeIcon icon="paper-plane" className="btn-icon" /> Say Hello
        </a>
      </div>
    </section>
  );
};

export default Contact;
