import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">Notta</Link>
        <div className="nav-right">
          <ul className="nav-menu">
            <li>
              <Link to="/" className={isActive('/')}>Home</Link>
            </li>
            <li>
              <Link to="/publications" className={isActive('/publications')}>Publications</Link>
            </li>
            <li>
              <Link to="/achievements" className={isActive('/achievements')}>Achievements</Link>
            </li>
            <li>
              <Link to="/activities" className={isActive('/activities')}>Activities</Link>
            </li>
            {/* <li>
              <Link to="/journey" className={isActive('/journey')}>My Main Journey</Link>
            </li>
            <li>
              <Link to="/myshow" className={isActive('/myshow')}>My Show</Link>
            </li>
            <li>
              <Link to="/blog" className={isActive('/blog')}>Blog</Link>
            </li> */}
          </ul>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
