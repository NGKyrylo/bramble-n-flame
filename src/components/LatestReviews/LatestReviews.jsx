'use client';
import React, { useState, useEffect, useRef } from "react";
import styles from "./LatestReviews.module.css";
import ReviewCard from "../ReviewCard/ReviewCard.jsx";
import RightArrowIcon from '/src/assets/RightArrowIcon.svg';
import useWindowWidth from '../../hooks/useWindowWidth.jsx';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LatestReviews = ({ productId = null }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowArrows, setShowArrows] = useState(false);
  const containerRef = useRef(null); // Для горизонтального прокручування

  // Винесена функція для завантаження відгуків
  const fetchReviews = async (count = 6, page = 1) => {
    setIsLoading(true);

    // Імітація отримання даних відгуків
    const fetchedReviews = Array.from({ length: count }, (_, index) => ({
      id: (page - 1) * count + index + 1,
      rating: Math.floor(Math.random() * 5) + 1,
      title: `Review Title ${(page - 1) * count + index + 1}`,
      text: `This is the body of review ${(page - 1) * count + index + 1}`,
      name: `Reviewer ${(page - 1) * count + index + 1}`,
      date: new Date().toLocaleDateString(),
      avatar: null,
    }));

    setTimeout(() => {
      setReviews((prev) => (page === 1 ? fetchedReviews : [...prev, ...fetchedReviews]));
      setIsLoading(false);
    }, 500); // Імітація затримки
  };

  useEffect(() => {
    // Якщо productId не передано, завантажуємо 6 відгуків для горизонтального відображення
    if (productId === null) {
      fetchReviews(6);
    } else {
      // Якщо передано productId, завантажуємо 10 відгуків для вертикального відображення
      fetchReviews(10);
    }
  }, [productId]);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      const containerWidth = Math.round(containerRef.current.clientWidth / (376 + 48)) * (376 + 48);
      containerRef.current.scrollBy({ left: -containerWidth, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      const containerWidth = Math.round(containerRef.current.clientWidth / (376 + 48)) * (376 + 48);
      containerRef.current.scrollBy({ left: containerWidth, behavior: "smooth" });
    }
  };

  const handleLoadMoreVertical = () => {
    if (!isLoading) {
      const nextPage = Math.ceil(reviews.length / 10) + 1; // Визначаємо наступну сторінку
      fetchReviews(10, nextPage);
    }
  };

  const width = useWindowWidth();

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000
  };

  return (
    <div className={styles.body}>
      <p className={styles.header}>Latest reviews</p>
      {productId === null ? (
        width <= 480 ? (
          <Slider {...settings}>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} type="horizontal" fillWidth/>
            ))}
          </Slider>
        ) : (
          // Горизонтальний режим
          <div className={styles.horizontalContainer} onMouseEnter={() => setShowArrows(true)} onMouseLeave={() => setShowArrows(false)}>
            {isShowArrows && (
              <div className={styles.arrowLeft} onClick={handleScrollLeft}>
                <RightArrowIcon />
              </div>
            )}
            <div className={styles.cardsContainer} ref={containerRef}>
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} type="horizontal" />
              ))}
            </div>
            {isShowArrows && (
              <div className={styles.arrowRight} onClick={handleScrollRight}>
                <RightArrowIcon />
              </div>
            )}
          </div>
        )
      ) : (
        // Вертикальний режим
        <div className={styles.verticalContainer}>
          <div className={styles.cardsContainer}>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} type="vertical" />
            ))}
          </div>
          {!isLoading && (
            <div
              className={styles.loadMore}
              onClick={handleLoadMoreVertical}
            >
              <p>Load More ↓</p>
            </div>
          )}
          {isLoading && <div className={styles.loading}><p>Loading...</p></div>}
        </div>
      )}
    </div>
  );
};

export default LatestReviews;