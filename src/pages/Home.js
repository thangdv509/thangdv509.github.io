import React from 'react';
import { WebIcon, MLIcon, CodeIcon, GitHubIcon, GoogleScholarIcon, EmailIcon } from '../components/Icons';
import avatarImage from '../assets/Homepage_avatar.png';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-greeting">Hello, I'm <span className="name-highlight">Thang Doan</span></h1>
            <p className="hero-description">
              Currently I'm an <strong>independent researcher</strong> and an <strong>AI engineer</strong> at Secomus Technology JSC | Hanoi, Vietnam.
              I am driven by the belief that technology’s true value lies in its ability to address real-world challenges, 
              particularly in improving decision-making processes. My interests focus on bridging the gap between technological 
              innovation and practical application by applying cutting-edge technologies such as machine learning and artificial 
              intelligences, with a strong emphasis on the Finance domain.
            </p>
            <div className="hero-links">
              <a href="https://github.com/thangdv509" target="_blank" rel="noopener noreferrer" className="hero-link">
                <GitHubIcon className="hero-link-icon" />
                <span>GitHub</span>
              </a>
              <a href="https://scholar.google.com/citations?view_op=list_works&hl=en&hl=en&user=Oi6ma9wAAAAJ&sortby=pubdate" target="_blank" rel="noopener noreferrer" className="hero-link">
                <GoogleScholarIcon className="hero-link-icon" />
                <span>Google Scholar</span>
              </a>
              <a href="mailto:thang.dv509@gmail.com" className="hero-link">
                <EmailIcon className="hero-link-icon" />
                <span>Email</span>
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="profile-image-container">
              <img src={avatarImage} alt="Thang Doan" className="profile-image" />
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <h2 className="section-heading">Research Interests</h2>
        <p className="section-intro">
          My research interests span Machine Learning (ML) and <strong>Large Language Models (LLMs)</strong>, with a focus on <strong>trustworthy AI</strong> and <strong>safety AI</strong>. Recently, I have been exploring synthetic data generation (especially for tabular data with LLMs).
        </p>
        <div className="interests-grid">
          <div className="interest-card">
            <div className="interest-icon">
              <MLIcon />
            </div>
            <h3>Large Language Models</h3>
          </div>
          <div className="interest-card">
            <div className="interest-icon">
              <WebIcon />
            </div>
            <h3>Trustworthy AI</h3>
          </div>
          <div className="interest-card">
            <div className="interest-icon">
              <CodeIcon />
            </div>
            <h3>Safety AI</h3>
          </div>
        </div>
      </section>

      <section className="home-section">
        <h2 className="section-heading">Education</h2>
        <div className="education-item">
          <div className="education-year">
            <span>Sep 2019 – Apr 2024</span>
          </div>
          <div className="education-details">
            <h3>B.S. in Computer Science</h3>
            <p>Hanoi University of Science and Technology | Hanoi | Vietnam</p>
            <p className="education-note">CPA: 3.66/4.0</p>
            <p className="education-note">Thesis: ZKP-based protocol connecting traditional finance to decentralized finance. (Grade: 9.6/10)</p>
          </div>
        </div>

        <div className="education-item">
          <div className="education-year">
            <span>Sep 2021 - Apr 2025</span>
          </div>
          <div className="education-details">
            <h3>B.S. in Finance</h3>
            <p>Banking Academy | Hanoi | Vietnam </p>
            <p className="education-note">CPA: 3.66/4.0</p>
            <p className="education-note">Thesis: The impact of financial distress on earnings management of firms in Vietnam. (Grade: 9.3/10)</p>
          </div>
        </div>
      </section>

      <section className="home-section">
        <h2 className="section-heading">News & Updates</h2>
        <ul className="news-list">
          <li>
            <span className="news-date">Jan 2026</span>
            <span className="news-content">Welcome to my webpage! I'm exicited to share my research and work with you 🤩🤩🤩</span>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Home;
