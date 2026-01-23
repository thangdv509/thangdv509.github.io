import React from 'react';
import './MyShow.css';

function MyShow() {
  const featuredPapers = [
    {
      id: 1,
      title: 'Your Featured Paper Title Here',
      authors: ['ThangDV', 'Co-author 1', 'Co-author 2'],
      venue: 'Top Conference/Journal Name 2024',
      description: 'Mô tả ngắn gọn về paper này và những đóng góp quan trọng của nó. Paper này đã được đánh giá cao và có tác động lớn trong lĩnh vực.',
      abstract: 'Abstract của paper sẽ được hiển thị ở đây khi người dùng click vào nút Abstract.',
      paperLink: '#',
      codeLink: '#',
      demoLink: '#'
    },
    {
      id: 2,
      title: 'Another Important Publication',
      authors: ['Co-author 1', 'ThangDV', 'Co-author 3'],
      venue: 'Prestigious Journal 2024',
      description: 'Một công trình nghiên cứu khác với những phát hiện thú vị và ứng dụng thực tế.',
      abstract: 'Abstract của paper thứ hai.',
      paperLink: '#',
      codeLink: '#',
      demoLink: '#'
    }
  ];

  const apps = [
    {
      id: 1,
      name: 'App Name 1',
      category: 'Web Application',
      description: 'Mô tả về ứng dụng này. Đây là một ứng dụng web được xây dựng với React và Node.js, có các tính năng...',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: '💻',
      demoLink: 'https://example.com',
      codeLink: 'https://github.com/thangdv509',
      featured: true
    },
    {
      id: 2,
      name: 'App Name 2',
      category: 'Mobile App',
      description: 'Mô tả về ứng dụng mobile này. Ứng dụng này giúp người dùng...',
      techStack: ['React Native', 'Firebase', 'TypeScript'],
      image: '📱',
      demoLink: 'https://example.com',
      codeLink: 'https://github.com/thangdv509',
      featured: true
    },
    {
      id: 3,
      name: 'App Name 3',
      category: 'Desktop Application',
      description: 'Mô tả về ứng dụng desktop này.',
      techStack: ['Electron', 'React', 'Python'],
      image: '🖥️',
      demoLink: 'https://example.com',
      codeLink: 'https://github.com/thangdv509',
      featured: false
    }
  ];

  return (
    <div className="myshow-page">
      <div className="myshow-intro">
        <h1 className="myshow-title">My Show</h1>
        <p className="myshow-subtitle">
          Giới thiệu các công trình nghiên cứu nổi bật và các ứng dụng đã phát triển
        </p>
      </div>

      {/* Featured Papers Section */}
      <section className="myshow-section">
        <div className="section-header">
          <h2 className="section-title">Featured Papers</h2>
          <p className="section-description">
            Các công trình nghiên cứu được chọn lọc và đánh giá cao
          </p>
        </div>
        <div className="papers-grid">
          {featuredPapers.map((paper) => (
            <div key={paper.id} className="paper-card">
              <div className="paper-header">
                <div className="paper-badge">Featured</div>
                <div className="paper-venue">{paper.venue}</div>
              </div>
              <h3 className="paper-title">{paper.title}</h3>
              <div className="paper-authors">
                {paper.authors.map((author, idx) => (
                  <span key={idx}>
                    {author === 'ThangDV' ? (
                      <span className="author-highlight">{author}</span>
                    ) : (
                      author
                    )}
                    {idx < paper.authors.length - 1 && ', '}
                  </span>
                ))}
              </div>
              <p className="paper-description">{paper.description}</p>
              <div className="paper-links">
                <a href={paper.paperLink} target="_blank" rel="noopener noreferrer" className="paper-link">
                  📄 Paper
                </a>
                {paper.codeLink && (
                  <a href={paper.codeLink} target="_blank" rel="noopener noreferrer" className="paper-link">
                    💻 Code
                  </a>
                )}
                {paper.demoLink && (
                  <a href={paper.demoLink} target="_blank" rel="noopener noreferrer" className="paper-link">
                    🚀 Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Apps Section */}
      <section className="myshow-section">
        <div className="section-header">
          <h2 className="section-title">My Applications</h2>
          <p className="section-description">
            Các ứng dụng và dự án đã phát triển
          </p>
        </div>
        <div className="apps-grid">
          {apps.map((app) => (
            <div key={app.id} className={`app-card ${app.featured ? 'featured' : ''}`}>
              {app.featured && <div className="app-badge">Featured</div>}
              <div className="app-visual">
                <div className="app-icon">{app.image}</div>
              </div>
              <div className="app-content">
                <div className="app-category">{app.category}</div>
                <h3 className="app-name">{app.name}</h3>
                <p className="app-description">{app.description}</p>
                <div className="app-tech">
                  {app.techStack.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="app-links">
                  <a href={app.demoLink} target="_blank" rel="noopener noreferrer" className="app-link">
                    🌐 Live Demo
                  </a>
                  <a href={app.codeLink} target="_blank" rel="noopener noreferrer" className="app-link">
                    📂 Source Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MyShow;
