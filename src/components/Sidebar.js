import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="profile-picture">
        <div className="profile-placeholder">
          <span>TD</span>
        </div>
      </div>
      <h1 className="profile-name">Notta</h1>
      <p className="profile-title">Developer & Researcher</p>
      <div className="profile-info">
        <p>
          <a href="https://github.com/thangdv509" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
        <p>
          <a href="#" target="_blank" rel="noopener noreferrer">
            Google Scholar
          </a>
        </p>
        <p>
          <a href="#" target="_blank" rel="noopener noreferrer">
            CV
          </a>
        </p>
        <p>
          <a href="mailto:your.email@example.com">
            Email
          </a>
        </p>
      </div>
      <div className="profile-address">
        <p>Vietnam</p>
      </div>
    </aside>
  );
}

export default Sidebar;
