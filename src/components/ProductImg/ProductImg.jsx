import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductImg.module.css';

const ProductImg = ({ src, size = 'medium', alt = 'Avatar', contain = false }) => {
    const productImgSrc = src || '/images/DefaultProductImg.svg';

    return (
        <div className={`${styles.productImg} ${styles[size]}`}>
            <img className={`${contain ? styles.contain : ''}`}
                loading="lazy"
                src={productImgSrc}
                alt={alt}
            />
        </div>
    );

    return (
        <img
            src={productImgSrc}
            alt={alt}
            className={`${styles.productImg} ${styles[size]}`}
        />
    );
};

ProductImg.propTypes = {
    src: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'big', 'fill']),
    alt: PropTypes.string,
};

export default ProductImg;