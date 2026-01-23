import React from 'react';
import './Blog.css';

function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: 'Getting Started with React',
      date: 'December 15, 2024',
      excerpt: 'This is a sample blog post about getting started with React. Learn the basics and build your first application.',
      category: 'Web Development'
    },
    {
      id: 2,
      title: 'Understanding Machine Learning Basics',
      date: 'December 10, 2024',
      excerpt: 'An introduction to machine learning concepts and how they can be applied in real-world scenarios.',
      category: 'Machine Learning'
    },
    {
      id: 3,
      title: 'Best Practices for Clean Code',
      date: 'December 5, 2024',
      excerpt: 'Tips and tricks for writing maintainable and clean code that your team will thank you for.',
      category: 'Software Engineering'
    }
  ];

  return (
    <div className="blog-page">
      <h2 className="page-title">Blog</h2>
      <p className="blog-intro">
        Chia sẻ về công nghệ, nghiên cứu và những điều thú vị khác.
      </p>
      <div className="blog-posts">
        {blogPosts.map((post) => (
          <article key={post.id} className="blog-post">
            <div className="blog-post-header">
              <span className="blog-category">{post.category}</span>
              <span className="blog-date">{post.date}</span>
            </div>
            <h3 className="blog-post-title">{post.title}</h3>
            <p className="blog-post-excerpt">{post.excerpt}</p>
            <a href="#" className="blog-read-more">Đọc thêm →</a>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Blog;
