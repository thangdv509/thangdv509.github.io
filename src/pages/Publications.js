import React, { useState } from 'react';
import publicationsData from '../data/publications.json';
import './Publications.css';

// Function to format date: "Jan 2025" -> "Jan 2025" (already in correct format)
function formatDate(dateString) {
  if (!dateString) return '';
  // Date is already in "Jan 2025" format, return as is
  return dateString;
}

// Function to format name: "Thang Doan Viet" -> "Thang Viet Doan"
function formatAuthorName(name) {
  const normalizedName = name.trim();
  
  // Check if it's "Thang Doan Viet" and convert to "Thang Viet Doan"
  if (normalizedName === 'Thang Doan Viet' || 
      normalizedName === 'Thang DoanViet' ||
      normalizedName === 'ThangDoanViet') {
    return 'Thang Viet Doan';
  }
  
  // Check if it's "ThangDV" or similar variations
  if (normalizedName === 'ThangDV' || 
      normalizedName === 'ThangDV' ||
      normalizedName.toLowerCase() === 'thangdv') {
    return 'Thang Viet Doan';
  }
  
  // Check if it contains all three parts: Thang, Doan, Viet (in any order)
  const nameLower = normalizedName.toLowerCase();
  if (nameLower.includes('thang') && nameLower.includes('doan') && nameLower.includes('viet')) {
    // If it's already "Thang Viet Doan", return as is
    if (normalizedName === 'Thang Viet Doan') {
      return normalizedName;
    }
    // Otherwise, convert to "Thang Viet Doan"
    return 'Thang Viet Doan';
  }
  
  return normalizedName;
}

// Function to render authors list
function renderAuthors(pub) {
  // Check if publication has first-authors or co-first-authors
  const firstAuthors = pub['first-authors'] || pub['co-first-authors'] || [];
  const otherAuthors = pub['other-authors'] || [];
  const regularAuthors = pub.authors || [];
  
  // If we have first-authors structure
  if (firstAuthors.length > 0) {
    const allAuthors = [];
    
    // Process first authors: add * to first 3 if there are more than 1
    const shouldAddAsterisk = firstAuthors.length > 1;
    firstAuthors.forEach((author, idx) => {
      const formattedName = formatAuthorName(author);
      const displayName = shouldAddAsterisk && idx < 3 ? `${formattedName}*` : formattedName;
      const isUser = formattedName === 'Thang Viet Doan';
      
      allAuthors.push(
        <span key={`first-${idx}`}>
          {isUser ? (
            <span className="author-highlight">{displayName}</span>
          ) : (
            displayName
          )}
        </span>
      );
    });
    
    // Add other authors
    otherAuthors.forEach((author, idx) => {
      const formattedName = formatAuthorName(author);
      const isUser = formattedName === 'Thang Viet Doan';
      
      allAuthors.push(
        <span key={`other-${idx}`}>
          {isUser ? (
            <span className="author-highlight">{formattedName}</span>
          ) : (
            formattedName
          )}
        </span>
      );
    });
    
    // Render with commas
    return allAuthors.map((authorSpan, idx) => (
      <React.Fragment key={idx}>
        {authorSpan}
        {idx < allAuthors.length - 1 && ', '}
      </React.Fragment>
    ));
  }
  
  // Fallback to regular authors array
  return regularAuthors.map((author, authIdx) => {
    const formattedName = formatAuthorName(author);
    const isUser = formattedName === 'Thang Viet Doan' || author === 'ThangDV';
    
    return (
      <span key={authIdx}>
        {isUser ? (
          <span className="author-highlight">{formattedName}</span>
        ) : (
          formattedName
        )}
        {authIdx < regularAuthors.length - 1 && ', '}
      </span>
    );
  });
}

function PublicationItem({ pub, pubIdx, expandedAbstracts, toggleAbstract }) {
  return (
    <div className="publication-item">
      <div className="publication-number">{pubIdx + 1}.</div>
      <div className="publication-wrapper">
        <div className="publication-content">
          <div className="publication-title">
            <strong>{pub.title}</strong>
          </div>
          <div className="publication-authors">
            {renderAuthors(pub)}
          </div>
          <div className="publication-venue">
            <em>{pub.venue}</em>
          </div>
          {pub['public-date'] && (
            <div className="publication-date">
              Published: {formatDate(pub['public-date'])}
            </div>
          )}
          {pub.notes && pub.notes.length > 0 && (
            <div className="publication-notes">
              <ul className="notes-list">
                {pub.notes.map((note, noteIdx) => (
                  <li key={noteIdx} className="note-item">{note}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="publication-actions">
            <button 
              className="btn-abstract"
              onClick={() => toggleAbstract(pub.id)}
            >
              {expandedAbstracts[pub.id] ? 'Hide Abstract' : 'Abstract'}
            </button>
            {pub.link && (
              <a href={pub.link} target="_blank" rel="noopener noreferrer" className="btn-paper">
                Paper
              </a>
            )}
          </div>
          {expandedAbstracts[pub.id] && pub.abstract && (
            <div className="publication-abstract">
              <div className="abstract-title">Abstract</div>
              <div className="abstract-text">{pub.abstract}</div>
            </div>
          )}
        </div>
        {pub.image && (
          <div className="publication-image">
            <img src={pub.image} alt={pub.title} />
          </div>
        )}
      </div>
    </div>
  );
}

function Publications() {
  const [expandedAbstracts, setExpandedAbstracts] = useState({});
  const [activeFilter, setActiveFilter] = useState('CS'); // Default to CS

  const toggleAbstract = (pubId) => {
    setExpandedAbstracts(prev => ({
      ...prev,
      [pubId]: !prev[pubId]
    }));
  };

  // Filter function
  const filterPublications = (publications) => {
    if (activeFilter === 'All') {
      return publications;
    }
    
    return publications.map(yearGroup => ({
      ...yearGroup,
      items: yearGroup.items.filter(pub => pub.category === activeFilter)
    })).filter(yearGroup => yearGroup.items.length > 0);
  };

  const { conferences, tutorials, preprints } = publicationsData;
  const filteredConferences = filterPublications(conferences);
  const filteredTutorials = filterPublications(tutorials);
  const filteredPreprints = filterPublications(preprints);

  return (
    <div className="publications-page">
      <h2 className="page-title">PUBLICATIONS</h2>
      <p className="publications-note">
        For a full list of publications, visit my{' '}
        <a href="https://scholar.google.com/citations?view_op=list_works&hl=en&hl=en&user=Oi6ma9wAAAAJ&sortby=pubdate" target="_blank" rel="noopener noreferrer">Google Scholar page</a>.
      </p>
      <p className="publications-note">
        <sup>*</sup> indicates equal contribution (co-first authors).
      </p>

      <div className="publications-filter">
        <button 
          className={`filter-btn ${activeFilter === 'CS' ? 'active' : ''}`}
          onClick={() => setActiveFilter('CS')}
        >
          Computer Science
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'Economics' ? 'active' : ''}`}
          onClick={() => setActiveFilter('Economics')}
        >
          Economics
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
          onClick={() => setActiveFilter('All')}
        >
          All
        </button>
      </div>

      {filteredTutorials.length > 0 && (
        <div className="publications-section">
          <h3 className="section-subtitle">Tutorials</h3>
          {filteredTutorials.map((yearGroup, idx) => (
            <div key={idx} className="year-group">
              <h4 className="year-title">{yearGroup.year}</h4>
              {yearGroup.items.map((pub, pubIdx) => (
                <PublicationItem
                  key={pubIdx}
                  pub={pub}
                  pubIdx={pubIdx}
                  expandedAbstracts={expandedAbstracts}
                  toggleAbstract={toggleAbstract}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {filteredConferences.length > 0 && (
        <div className="publications-section">
          <h3 className="section-subtitle">Conferences/Journals</h3>
          {filteredConferences.map((yearGroup, idx) => (
            <div key={idx} className="year-group">
              <h4 className="year-title">{yearGroup.year}</h4>
              {yearGroup.items.map((pub, pubIdx) => (
                <PublicationItem
                  key={pubIdx}
                  pub={pub}
                  pubIdx={pubIdx}
                  expandedAbstracts={expandedAbstracts}
                  toggleAbstract={toggleAbstract}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {filteredPreprints.length > 0 && (
        <div className="publications-section">
          <h3 className="section-subtitle">Preprints</h3>
          {filteredPreprints.map((yearGroup, idx) => (
            <div key={idx} className="year-group">
              <h4 className="year-title">{yearGroup.year}</h4>
              {yearGroup.items.map((pub, pubIdx) => (
                <PublicationItem
                  key={pubIdx}
                  pub={pub}
                  pubIdx={pubIdx}
                  expandedAbstracts={expandedAbstracts}
                  toggleAbstract={toggleAbstract}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Publications;
