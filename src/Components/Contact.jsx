import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export default function Contact({ data }) {
  return <section id="contact" className="contact-section" aria-labelledby="contact-heading"><p className="eyebrow">Get in touch</p><h2 id="contact-heading">Let’s talk.</h2><p>{data.contactmessage}</p><a className="contact-email" href={`mailto:${data.email}`}>{data.email} <FontAwesomeIcon icon={faArrowUpRightFromSquare} aria-hidden="true" /></a></section>;
}
