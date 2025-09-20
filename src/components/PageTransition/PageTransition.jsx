import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './PageTransition.module.css';

import Loader from "../Loader/Loader.jsx";

const PageTransition = () => {
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 900);
        return () => clearTimeout(timer);
    }, [location]);

    if (!isLoading) return null;

    return (
        <div className={styles.pageTransition}>
            <Loader />
        </div>
    );
};

export default PageTransition;