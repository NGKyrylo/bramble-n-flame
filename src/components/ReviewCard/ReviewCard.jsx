import React from "react";
import styles from "./ReviewCard.module.css";
// import { ReactComponent as Star } from "../../assets/Star.svg";
// import { ReactComponent as StarFilled } from "../../assets/StarFilled.svg";
import Star from '/src/assets/Star.svg';
import StarFilled from '/src/assets/StarFilled.svg';
import Avatar from '../Avatar/Avatar.jsx';

const Rating = ({ rating }) => {
    const maxStars = 5;

    return (
        <div className={styles.rating}>
            {Array.from({ length: maxStars }, (_, index) => (
                <span key={index} className={styles.star}>
                    {index + 1 <= rating ? (
                        // <img src={StarFilled} alt="Star Filled" />
                        <StarFilled />
                    ) : (
                        // <img src={Star} alt="Star" />
                        <Star />
                    )}
                </span>
            ))}
        </div>
    )
}

const ReviewCard = ({ review, type = "horizontal", fillWidth = false }) => {
    const bodyClass = `${styles.body} ${styles[type]} ${fillWidth ? styles.fillWidth : ""}`;
    return (
        <div className={bodyClass}>
            <Rating rating={review.rating} />
            <div className={styles.reviewDataContainer}>
                <p className={styles.reviewTitle}>{review.title}</p>
                <p className={styles.reviewText}>{review.text}</p>
            </div>
            <div className={styles.reviewerData}>
                <Avatar src={review.avatar} size="medium" />
                <div className={styles.reviewInfo}>
                    <p className={styles.reviewerName}>{review.name}</p>
                    <p className={styles.reviewDate}>{review.date}</p>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard