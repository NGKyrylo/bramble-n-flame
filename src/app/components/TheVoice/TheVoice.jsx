'use client';
import { useEffect, useRef } from 'react';

import styles from './TheVoice.module.css';

const TheVoice = () => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
        }
    }, []);

    return (
        <div className={styles.body}>
            <p className={styles.header}>The Voice of Bramble & Flame</p>
            <p className={styles.text}>
                Take a moment to hear our story – the passion behind the scent, the flame, and the craft.
            </p>
            <audio controls ref={audioRef} className={styles.audio}>
                <source src="/BrambleAndFlame_Podcast_With_CosyFireplace_Music.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    )
};

export default TheVoice;