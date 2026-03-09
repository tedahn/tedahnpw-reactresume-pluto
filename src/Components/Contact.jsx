import React, { Suspense } from 'react';
import SectionShapes from './SectionShapes';
const ContactScene3D = React.lazy(() =>
  import('./Scene3D').then((m) => ({ default: m.ContactScene3D }))
);

const Contact = ({ data }) => {
  if (!data) return null;

  return (
    <section id="contact" className="contact-section">
      <SectionShapes variant="contact" />
      <Suspense fallback={null}><ContactScene3D /></Suspense>
      <div className="contact-wrapper">
        <h2 className="contact-heading">
          Let's talk<span className="contact-dot">.</span>
        </h2>
        <a href={`mailto:${data.email}`} className="contact-email">
          {data.email}
        </a>
        <p className="contact-location">
          {data.address.city}, {data.address.state}
        </p>
      </div>
    </section>
  );
};

export default Contact;
