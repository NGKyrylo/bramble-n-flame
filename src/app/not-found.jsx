import React from "react";
import styles from "./NotFound.module.css";

export const metadata = {
    title: "Bramble & Flame - 404",
    description: "Handcrafted soy wax candles inspired by Derbyshire. Vegan-friendly, cruelty-free, and made with love. Discover unique decorative candles for your home.",
    robots: "noindex, nofollow",
};

const NotFound = () => {
    return (
        <main className={styles.main}>
            <h1>404</h1>
            <p>Page not found</p>
        </main>
    );
};

export default NotFound;