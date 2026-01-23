import React, { useState } from 'react';
import { LocationIcon, CarouselPrevIcon, CarouselNextIcon } from '../components/Icons';
import './Journey.css';

function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <button className="carousel-btn carousel-btn-prev" onClick={prevImage} aria-label="Previous image">
          <CarouselPrevIcon />
        </button>
        <div className="carousel-slide">
          {images.map((img, index) => (
            <div
              key={index}
              className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
            >
              {img.type === 'emoji' ? (
                <div className="carousel-emoji">{img.content}</div>
              ) : (
                <div className="carousel-placeholder">
                  <span>{img.content}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <button className="carousel-btn carousel-btn-next" onClick={nextImage} aria-label="Next image">
          <CarouselNextIcon />
        </button>
      </div>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToImage(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function Journey() {
  const journeys = [
    {
      year: '2024',
      items: [
        {
          title: 'Chuyến du lịch Đà Lạt',
          date: 'Tháng 12, 2024',
          location: 'Đà Lạt, Việt Nam',
          description: 'Khám phá thành phố ngàn hoa với không khí trong lành và cảnh đẹp tuyệt vời. Tham quan các địa điểm nổi tiếng như Hồ Xuân Hương, Chợ Đà Lạt, và các đồi chè xanh mướt. Trải nghiệm văn hóa địa phương và thưởng thức những món ăn đặc sản tuyệt vời.',
          images: [
            { type: 'emoji', content: '🌺' },
            { type: 'emoji', content: '🏔️' },
            { type: 'emoji', content: '☕' },
            { type: 'emoji', content: '🌸' }
          ]
        },
        {
          title: 'Hành trình học tập tại Hà Nội',
          date: 'Tháng 8, 2024',
          location: 'Hà Nội, Việt Nam',
          description: 'Tham gia các khóa học và hội thảo về công nghệ tại thủ đô. Gặp gỡ nhiều bạn bè cùng đam mê và học hỏi thêm nhiều kiến thức mới. Cơ hội được lắng nghe các chuyên gia hàng đầu chia sẻ về xu hướng công nghệ mới nhất.',
          images: [
            { type: 'emoji', content: '📚' },
            { type: 'emoji', content: '💻' },
            { type: 'emoji', content: '🎓' },
            { type: 'emoji', content: '🤝' }
          ]
        }
      ]
    },
    {
      year: '2023',
      items: [
        {
          title: 'Chuyến đi Sài Gòn',
          date: 'Tháng 6, 2023',
          location: 'TP. Hồ Chí Minh, Việt Nam',
          description: 'Khám phá thành phố năng động nhất Việt Nam. Trải nghiệm ẩm thực đường phố, tham quan các địa danh lịch sử và tận hưởng nhịp sống sôi động. Đặc biệt ấn tượng với kiến trúc Pháp cổ và các khu phố cổ đầy màu sắc.',
          images: [
            { type: 'emoji', content: '🏙️' },
            { type: 'emoji', content: '🍜' },
            { type: 'emoji', content: '🚶' },
            { type: 'emoji', content: '🌆' }
          ]
        },
        {
          title: 'Hành trình bắt đầu nghiên cứu',
          date: 'Tháng 3, 2023',
          location: 'Online',
          description: 'Bắt đầu hành trình nghiên cứu và phát triển các dự án cá nhân. Tìm hiểu về machine learning và web development. Xây dựng nền tảng kiến thức vững chắc và bắt đầu thực hiện những ý tưởng đầu tiên.',
          images: [
            { type: 'emoji', content: '🔬' },
            { type: 'emoji', content: '💡' },
            { type: 'emoji', content: '🚀' },
            { type: 'emoji', content: '⚡' }
          ]
        }
      ]
    }
  ];

  return (
    <div className="journey-page">
      <div className="journey-intro">
        <h1 className="journey-title">My Main Journey</h1>
        <p className="journey-subtitle">
          Hành trình của tôi qua những chuyến du lịch, trải nghiệm và những khoảnh khắc đáng nhớ
        </p>
      </div>

      <div className="journey-content">
        {journeys.map((yearGroup, idx) => (
          <div key={idx} className="journey-year-section">
            <div className="year-header">
              <span className="year-badge">{yearGroup.year}</span>
            </div>
            <div className="journey-items">
              {yearGroup.items.map((journey, journeyIdx) => (
                <div key={journeyIdx} className="journey-item">
                  <div className="journey-content-left">
                    <div className="journey-meta">
                      <span className="journey-date">{journey.date}</span>
                      <span className="journey-location">
                        <LocationIcon className="location-icon" />
                        {journey.location}
                      </span>
                    </div>
                    <h3 className="journey-item-title">{journey.title}</h3>
                    <p className="journey-item-description">{journey.description}</p>
                  </div>
                  <div className="journey-content-right">
                    <ImageCarousel images={journey.images} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Journey;
