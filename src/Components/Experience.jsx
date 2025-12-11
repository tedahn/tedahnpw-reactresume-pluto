import React from 'react';
import AnimatedSection from './AnimatedSection';

const Experience = ({ work, education }) => {
  if (!work || !education) return null;

  // Helper to parse dates
  const parseDate = (dateStr) => {
    if (!dateStr) return new Date(0);
    // Handle "Month Year - ..." format, taking the first part
    const startDatePart = dateStr.split('-')[0].trim();
    // Handle "May 2019" (Graduated date) -> Treat as end date? 
    // For sorting "Oldest to Latest", users usually want to see when it started.
    return new Date(startDatePart);
  };

  // 1. Normalize items
  const workItems = work.map(item => ({
    ...item,
    type: 'work',
    sortDate: parseDate(item.dates),
    displayDate: item.dates,
    status: item.status, // Pass status through
    timelineImage: item.timelineImage, // Pass image
    primary: item.company,
    secondary: item.title,
    location: item.location,
    details: item.description,
    achievements: item.achievements || []
  }));

  const eduItems = education.map(item => ({
    ...item,
    type: 'education',
    sortDate: parseDate(item.graduated), // Using 'graduated' field which might contain range or single date
    displayDate: item.graduated,
    status: item.status || 'Graduated',
    timelineImage: item.timelineImage, // Pass image
    primary: item.school,
    secondary: item.degree,
    location: '', // Education often doesn't have location field in this JSON, but we can check
    details: item.description,
    achievements: [] // Education usually doesn't have the cards array in JSON, but could add if needed
  }));

  // 2. Merge and Sort (Oldest first)
  const timelineItems = [...workItems, ...eduItems].sort((a, b) => a.sortDate - b.sortDate);

  // 3. Add "Future" Item
  timelineItems.push({
    type: 'future',
    sortDate: new Date(), // Always last
    displayDate: '2025 & Beyond',
    status: "What's next?",
    primary: "I'm still continuing my journey...",
    secondary: '',
    location: '',
    details: "It's most likely that I'm still running around and about. I hope to one day work with you too to make valuable change and meaningful experiences!",
    achievements: []
  });

  return (
    <section id="experience" className="container">
      <div className="section-title">
        <h2>My <span>Journey</span></h2>
        <p className="section-intro">
          Hi everyone, thank you for visiting my page and for your interest. Resumes can be pretty boring to read so I've made a fun little way to look at my career and academic history. Take a look at what I've done in my career!
        </p>
      </div>

      <div className="experience-timeline">
        {timelineItems.map((item, index) => (
          <AnimatedSection key={`${item.type}-${index}`} className={`experience-block ${item.type}`}>
            {/* Header */}
            <div className="company-header">
              <div className="header-top">
                {item.type !== 'future' && (
                  <span className={`type-badge ${item.type}`}>
                    {item.type === 'work' ? '💼 Work' : '🎓 Education'}
                  </span>
                )}
                <span className="dates">{item.displayDate}</span>
              </div>

              {/* Status Label */}
              {item.status && (
                <div className="status-label">
                  {item.status}
                </div>
              )}

              {/* Timeline Feature Image */}
              {item.timelineImage && (
                <div className="timeline-image-container">
                  <img src={item.timelineImage} alt={`${item.primary} moment`} />
                </div>
              )}

              <h3 className="gradient-text">{item.primary}</h3>
              <p className="role">{item.secondary}</p>
              {item.location && <p className="location">{item.location}</p>}
              {item.details && <p className="description">{item.details}</p>}
            </div>

            {/* Achievements (Only for Work mostly, but generic enough) */}
            {item.achievements.length > 0 && (
              <div className="achievement-string">
                {item.achievements.map((achievement, i) => (
                  <div key={i} className="achievement-card">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.desc}</p>
                  </div>
                ))}
              </div>
            )}

          </AnimatedSection>
        ))}
      </div>
    </section>
  );
};

export default Experience;
