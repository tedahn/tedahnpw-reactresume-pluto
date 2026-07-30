import React from 'react';

const StructuredData = ({ data }) => {
  if (!data?.main || !data?.resume) return null;

  const { main, resume, portfolio } = data;
  const sameAs = main.social
    .map((network) => network.url)
    .filter((url) => url.startsWith('https://'));
  const organizations = [...new Set(resume.work.map((role) => role.company))];

  const profile = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: main.website,
    name: `${main.name} — professional profile`,
    description: main.description,
    mainEntity: {
      '@type': 'Person',
      name: main.fullname || main.name,
      alternateName: main.name,
      url: main.website,
      email: `mailto:${main.email}`,
      jobTitle: main.occupation,
      address: {
        '@type': 'PostalAddress',
        addressLocality: main.basecity,
        addressRegion: main.basestate,
        addressCountry: main.basecountry,
      },
      sameAs,
      knowsAbout: resume.skills.map((skill) => skill.name),
      worksFor: organizations.map((name) => ({ '@type': 'Organization', name })),
      alumniOf: resume.education.map((item) => ({
        '@type': 'EducationalOrganization',
        name: item.school,
      })),
    },
    hasPart: [...(portfolio?.projects || []), ...(portfolio?.fieldNotes || [])].map((item) => ({
      '@type': 'CreativeWork',
      name: item.title,
      description: item.description || item.summary,
      url: item.url || item.links?.[0]?.url,
    })),
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(profile)}
    </script>
  );
};

export default StructuredData;
