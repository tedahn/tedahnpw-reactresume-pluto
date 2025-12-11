import React from 'react';

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
            <h3>Contact Details</h3>
            <p className="address">
              <strong>{name}</strong><br />
              {street}<br />
              {city} {state}, {zip}<br />
              <br />
              <span>{phone}</span><br />
              <a href={`mailto:${email}`}>{email}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
