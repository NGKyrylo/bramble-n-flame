import React from 'react';
import PropTypes from 'prop-types';
import styles from './Avatar.module.css';
import defaultAvatar from '../../assets/DefaultAvatar.svg';

const Avatar = ({ src, size = 'medium', alt = 'Avatar' }) => {
    const avatarSrc = src || defaultAvatar;
  
    return (
      <img 
        src={avatarSrc} 
        alt={alt} 
        className={`${styles.avatar} ${styles[size]}`} 
      />
    );
};
  
Avatar.propTypes = {
    src: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    alt: PropTypes.string,
};
  
export default Avatar;