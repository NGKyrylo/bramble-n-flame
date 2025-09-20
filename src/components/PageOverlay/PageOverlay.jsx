'use client';
import { useState, useEffect } from 'react';
import styles from './PageOverlay.module.css';

const phrases = [
    "finding its flame.",
    "waiting for its spark.",
    "resting in the workshop.",
    "a wick in waiting.",
    "shaping itself in silence."
];

const PageOverlay = () => {
    // const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    const [phrase, setPhrase] = useState('');

    useEffect(() => {
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        setPhrase(randomPhrase);
    }, []);

    return (
        <div className={styles.pageOverlay}>
            <h1 className={styles.overlayText}>This page is still {phrase}</h1>
        </div >
    );
};

export default PageOverlay;