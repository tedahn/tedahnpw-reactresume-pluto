import React from 'react';

export default function Social({ data }) {
  return <footer className="site-footer"><p>© {new Date().getFullYear()} {data.name}</p><nav aria-label="Resume formats"><span>Resume formats</span><a href={data.resumeResources.printable}>Print / PDF</a><a href={data.resumeResources.text}>Text</a><a href={data.resumeResources.ai}>Markdown</a><a href={data.resumeResources.structured}>JSON</a></nav><a href="#home">Back to top</a></footer>;
}
