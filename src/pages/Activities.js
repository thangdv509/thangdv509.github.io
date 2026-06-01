import React, { useState, useEffect, useRef, useCallback } from 'react';
import activitiesData from '../data/activities';
import './Activities.css';

const ITEMS_PER_PAGE = 9;
const AUTO_PLAY_INTERVAL = 3000;
const DRAG_THRESHOLD = 40;

function ImageCarousel({ images, event }) {
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(null);
  const timerRef = useRef(null);

  const count = images.length;

  const goTo = useCallback((i) => {
    setIndex((i + count) % count);
  }, [count]);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    if (count > 1) {
      timerRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % count);
      }, AUTO_PLAY_INTERVAL);
    }
  }, [count]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const onDragStart = (clientX) => {
    dragStartX.current = clientX;
    setDragging(true);
    clearInterval(timerRef.current);
  };

  const onDragEnd = (clientX) => {
    if (dragStartX.current === null) return;
    const delta = dragStartX.current - clientX;
    if (Math.abs(delta) > DRAG_THRESHOLD) {
      goTo(index + (delta > 0 ? 1 : -1));
    }
    dragStartX.current = null;
    setDragging(false);
    resetTimer();
  };

  if (count === 0) {
    return <div className="activity-image-placeholder" />;
  }

  return (
    <div
      className={`carousel-wrapper${dragging ? ' dragging' : ''}`}
      onMouseDown={(e) => onDragStart(e.clientX)}
      onMouseUp={(e) => onDragEnd(e.clientX)}
      onMouseLeave={() => { dragStartX.current = null; setDragging(false); resetTimer(); }}
      onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
      onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
    >
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className="carousel-slide">
            <img src={src} alt={`${event} ${i + 1}`} className="activity-image" draggable={false} />
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={(e) => { e.stopPropagation(); goTo(index - 1); resetTimer(); }}
          >
            ‹
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={(e) => { e.stopPropagation(); goTo(index + 1); resetTimer(); }}
          >
            ›
          </button>
          <div className="carousel-dots">
            {images.map((_, i) => (
              <span
                key={i}
                className={`carousel-dot${i === index ? ' active' : ''}`}
                onClick={(e) => { e.stopPropagation(); goTo(i); resetTimer(); }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function Activities() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(activitiesData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = activitiesData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="activities-page">
      <h1 className="page-title">Activities</h1>

      {activitiesData.length === 0 ? (
        <p className="activities-empty">No activities yet.</p>
      ) : (
        <>
          <div className="activities-grid">
            {currentItems.map((item) => (
              <div key={item.id} className="activity-card">
                <div className="activity-image-wrapper">
                  <ImageCarousel images={item.images || []} event={item.event} />
                </div>
                <div className="activity-info">
                  <p className="activity-event">{item.event}</p>
                  <p className="activity-organization">{item.organization}</p>
                  {item.date && <p className="activity-date">{item.date}</p>}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="activity-link"
                  >
                    View details →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="activities-pagination">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Activities;
